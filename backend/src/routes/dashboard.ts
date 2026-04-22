import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { mockOverview, mockPipelineRun } from "../services/mockData.js";
import { ok } from "../utils/api.js";

export const dashboardRouter = Router();

dashboardRouter.get("/overview", requireAuth, async (_req, res) => {
  return ok(res, mockOverview());
});

dashboardRouter.get("/pipeline-runs", requireAuth, async (_req, res) => {
  return ok(res, [mockPipelineRun()]);
});
