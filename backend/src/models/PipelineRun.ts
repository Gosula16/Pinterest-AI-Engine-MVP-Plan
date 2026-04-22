import { Schema, model, Types } from "mongoose";

const stageSchema = new Schema(
  {
    stage: { type: String, required: true },
    status: { type: String, required: true },
    startedAt: Date,
    completedAt: Date,
    message: String
  },
  { _id: false }
);

const pipelineRunSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
    niche: { type: String, required: true },
    keywordCount: { type: Number, default: 0 },
    status: { type: String, enum: ["queued", "running", "completed", "failed"], default: "queued" },
    stages: { type: [stageSchema], default: [] },
    requestParams: { type: Schema.Types.Mixed, default: {} },
    errorSummary: String
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const PipelineRun = model("PipelineRun", pipelineRunSchema);

