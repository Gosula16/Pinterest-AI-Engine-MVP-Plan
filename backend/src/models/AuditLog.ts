import { Schema, model, Types } from "mongoose";

const auditLogSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    event: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = model("AuditLog", auditLogSchema);

