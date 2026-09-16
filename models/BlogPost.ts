import { Schema, models, model } from "mongoose";

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: Date;
  imageUrl?: string;
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Nexmogen Team" },
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String },
});

export default models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
