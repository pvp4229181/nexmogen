import { Schema, models, model } from "mongoose";

export interface ITestimonial {
  name: string;
  role: string;
  quote: string;
  order: number;
  imageUrl?: string;
  rating?: number;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  quote: { type: String, required: true },
  order: { type: Number, default: 0 },
  imageUrl: { type: String },
  rating: { type: Number },
});

export default models.Testimonial ||
  model<ITestimonial>("Testimonial", TestimonialSchema);
