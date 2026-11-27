// Adds one post from lib/data.ts to MongoDB without touching other data.
// Usage: npx tsx scripts/add-blog-post.ts <slug>   (needs MONGODB_URI in .env.local)
import { config } from "dotenv";
import mongoose from "mongoose";

config({ path: [".env.local", ".env"] });

async function main() {
  const slug = process.argv[2];
  if (!slug) throw new Error("Pass the post slug.");
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI. Add it to .env.local.");

  // Imported after dotenv: lib/mongodb reads MONGODB_URI when it loads.
  const { fallbackBlogPosts } = await import("../lib/data");
  const { default: BlogPost } = await import("../models/BlogPost");

  const post = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!post) throw new Error(`No post with slug "${slug}" in lib/data.ts.`);

  await mongoose.connect(process.env.MONGODB_URI);
  // With no published posts the site shows the built-in list, and inserting one would hide the rest.
  if (!(await BlogPost.exists({ published: true }))) {
    console.log("No published posts in the database: the site already shows the built-in list. Nothing added.");
    return;
  }
  const result = await BlogPost.updateOne({ slug }, { $setOnInsert: post }, { upsert: true });
  console.log(result.upsertedCount ? `Added "${slug}".` : `"${slug}" already exists. Nothing changed.`);
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
