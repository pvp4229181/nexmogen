import { Schema, models, model } from "mongoose";

export interface IProject {
  name: string;
  category: string;
  order: number;
  imageUrl?: string;
  websiteUrl?: string;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  order: { type: Number, default: 0 },
  imageUrl: { type: String },
  websiteUrl: { type: String },
});

export default models.Project || model<IProject>("Project", ProjectSchema);
