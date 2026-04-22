import { Schema, model, Types } from "mongoose";

const connectionSecretSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    provider: {
      type: String,
      enum: ["openai", "amazon", "cloudinary", "pinterest"],
      required: true
    },
    payload: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

connectionSecretSchema.index({ userId: 1, provider: 1 }, { unique: true });

export const ConnectionSecret = model("ConnectionSecret", connectionSecretSchema);

