import { Schema, model } from "mongoose";

const boardSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    plan: { type: String, enum: ["free", "pro"], default: "free" },
    pinterest: {
      accessToken: String,
      refreshToken: String,
      username: String,
      boards: [boardSchema]
    },
    settings: {
      dailyPinLimit: { type: Number, default: 3 },
      postTimezone: { type: String, default: "Asia/Kolkata" },
      niches: { type: [String], default: ["ai tools for students"] },
      postingWindows: {
        weekday: { type: [String], default: ["20:00", "21:00", "22:00"] },
        weekend: { type: [String], default: ["14:00", "15:00", "16:00"] }
      },
      disclosureText: {
        type: String,
        default: "As an Amazon Associate I earn from qualifying purchases."
      },
      automationThresholds: {
        cloneCtr: { type: Number, default: 0.05 },
        mutateCtr: { type: Number, default: 0.01 },
        minImpressions: { type: Number, default: 150 }
      }
    }
  },
  { timestamps: true }
);

export const User = model("User", userSchema);

