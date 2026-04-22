import { Schema, model, Types } from "mongoose";

const keywordSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    keyword: { type: String, required: true },
    trendScore: { type: Number, required: true },
    source: { type: String, enum: ["google", "pinterest", "manual"], required: true },
    status: {
      type: String,
      enum: ["discovered", "approved", "processing", "done", "rejected"],
      default: "discovered"
    },
    approved: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Keyword = model("Keyword", keywordSchema);

