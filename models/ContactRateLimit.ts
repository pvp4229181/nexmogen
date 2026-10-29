import { Schema, models, model } from "mongoose";

const schema = new Schema({
  _id: { type: String, required: true },
  count: { type: Number, required: true },
  expiresAt: { type: Date, required: true, expires: 0 },
});

export default models.ContactRateLimit || model("ContactRateLimit", schema);
