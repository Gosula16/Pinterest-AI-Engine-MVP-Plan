import { Schema, model, Types } from "mongoose";

const affiliateProductSchema = new Schema(
  {
    asin: String,
    title: String,
    price: String,
    rating: Number,
    reviews: Number,
    affiliateUrl: String,
    imageUrl: String
  },
  { _id: false }
);

const pinSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    keywordId: { type: Types.ObjectId, ref: "Keyword" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], default: [] },
    imageUrl: { type: String, required: true },
    affiliateProducts: { type: [affiliateProductSchema], default: [] },
    pinterestPinId: String,
    boardId: String,
    status: {
      type: String,
      enum: ["draft", "queued", "scheduled", "posted", "failed"],
      default: "draft"
    },
    scheduledFor: Date,
    postedAt: Date,
    analytics: {
      impressions: { type: Number, default: 0 },
      saves: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      ctr: { type: Number, default: 0 },
      lastFetchedAt: Date
    },
    templateColor: { type: String, default: "#1e40af" },
    flagged: { type: Boolean, default: false },
    ctrEstimate: { type: Number, default: 0.032 }
  },
  { timestamps: true }
);

export const Pin = model("Pin", pinSchema);

