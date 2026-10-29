import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";
import ContactRateLimit from "@/models/ContactRateLimit";
import { createHash } from "node:crypto";

const MAX_BODY_BYTES = 16 * 1024;

async function consumeLimit(key: string, limit: number, windowMs: number) {
  const window = Math.floor(Date.now() / windowMs);
  const bucket = await ContactRateLimit.findOneAndUpdate(
    { _id: `${key}:${window}` },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * windowMs) } },
    { upsert: true, new: true }
  );
  return bucket.count <= limit;
}

export async function POST(req: NextRequest) {
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return NextResponse.json({ error: "Send JSON content." }, { status: 415 });
  }

  let body: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) return NextResponse.json({ error: "A request body is required." }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "Request is too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid contact details." }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;
  const { name, email, message } = fields;
  const phone = fields.phone ?? "";
  if (
    typeof name !== "string" || !name.trim() || name.length > 100 ||
    typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof message !== "string" || !message.trim() || message.length > 5000 ||
    typeof phone !== "string" || phone.length > 40
  ) {
    return NextResponse.json({ error: "Provide a valid name, email, and message within the field limits." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    // Durable across serverless instances; the global limit also bounds new email buckets.
    const emailKey = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
    if (!await consumeLimit("global", 30, 60_000) || !await consumeLimit(emailKey, 5, 3_600_000)) {
      return NextResponse.json({ error: "Too many enquiries. Please try again later." }, { status: 429, headers: { "Retry-After": "3600" } });
    }
    await ContactSubmission.create({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), message: message.trim() });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form submission failed:", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
