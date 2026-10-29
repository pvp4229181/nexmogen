import assert from "node:assert/strict";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import ContactSubmission from "../models/ContactSubmission";
import ContactRateLimit from "../models/ContactRateLimit";

async function main() {
  // Exercise the real handler without connecting to or writing to a real database.
  globalThis._mongooseCache = { conn: mongoose, promise: null };
  const counts = new Map<string, number>();
  const saved: Record<string, string>[] = [];
  ContactRateLimit.findOneAndUpdate = (async (filter: { _id: string }) => {
    const count = (counts.get(filter._id) ?? 0) + 1;
    counts.set(filter._id, count);
    return { count };
  }) as typeof ContactRateLimit.findOneAndUpdate;
  ContactSubmission.create = (async (data: Record<string, string>) => {
    saved.push(data);
    return data;
  }) as typeof ContactSubmission.create;
  const { POST } = await import("../app/api/contact/route");
  const request = (body: string, contentType = "application/json") => POST(new NextRequest("http://localhost/api/contact", {
    method: "POST", headers: { "content-type": contentType }, body,
  }));
  const valid = { name: " Test ", email: "Test@Example.com", phone: "", message: " Hello " };
  for (const body of ["{", "null", "[]", JSON.stringify({ ...valid, email: { $ne: null } }), JSON.stringify({ ...valid, name: " " }), JSON.stringify({ ...valid, message: "x".repeat(5001) }), JSON.stringify({ ...valid, phone: 123 }), JSON.stringify({ ...valid, email: "invalid" })]) {
    assert.equal((await request(body)).status, 400);
  }
  assert.equal((await request(JSON.stringify(valid), "text/plain")).status, 415);
  assert.equal((await request("x".repeat(16385))).status, 413);
  assert.equal(saved.length, 0);
  for (let i = 0; i < 5; i++) assert.equal((await request(JSON.stringify(valid))).status, 201);
  assert.equal(saved[0].email, "test@example.com");
  assert.equal(saved[0].name, "Test");
  const limited = await request(JSON.stringify(valid));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "3600");
  assert.equal(saved.length, 5);
  counts.clear();
  for (let i = 0; i < 30; i++) assert.equal((await request(JSON.stringify({ ...valid, email: `test${i}@example.com` }))).status, 201);
  assert.equal((await request(JSON.stringify({ ...valid, email: "another@example.com" }))).status, 429);
  console.log("Contact security checks passed (validation, body limit, normalization, email and global rate limits).");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
