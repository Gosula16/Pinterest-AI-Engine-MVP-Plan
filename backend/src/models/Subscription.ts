import { Schema, model, Types } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    status: {
      type: String,
      enum: ["inactive", "trialing", "active", "past_due", "canceled"],
      default: "inactive"
    },
    renewalDate: Date
  },
  { timestamps: true }
);

export const Subscription = model("Subscription", subscriptionSchema);

