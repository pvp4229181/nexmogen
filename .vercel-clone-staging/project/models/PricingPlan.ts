import { Schema, models, model } from "mongoose";

export interface IPricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

const PricingPlanSchema = new Schema<IPricingPlan>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  features: { type: [String], default: [] },
  highlighted: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
});

export default models.PricingPlan ||
  model<IPricingPlan>("PricingPlan", PricingPlanSchema);
