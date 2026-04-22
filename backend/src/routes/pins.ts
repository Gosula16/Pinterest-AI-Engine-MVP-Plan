import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Pin } from "../models/Pin.js";
import { runPipeline } from "../services/pipelineService.js";
import { publishPin } from "../services/pinterestService.js";
import { ok, fail } from "../utils/api.js";

export const pinsRouter = Router();

pinsRouter.get("/", requireAuth, async (req, res) => {
  const pins = await Pin.find({ userId: req.auth!.userId }).sort({ createdAt: -1 }).lean();
  return ok(res, pins);
});

pinsRouter.post("/generate", requireAuth, async (req, res) => {
  const niche = (req.body?.niche as string | undefined)?.trim();
  if (!niche) {
    return fail(res, "VALIDATION_ERROR", "Niche is required");
  }
  const run = await runPipeline(req.auth!.userId, niche);
  return ok(res, run);
});

pinsRouter.get("/:id", requireAuth, async (req, res) => {
  const pin = await Pin.findOne({ _id: req.params.id, userId: req.auth!.userId }).lean();
  if (!pin) {
    return fail(res, "NOT_FOUND", "Pin not found", 404);
  }
  return ok(res, pin);
});

pinsRouter.patch("/:id", requireAuth, async (req, res) => {
  const allowed = ["title", "description", "boardId", "status", "scheduledFor"] as const;
  const updates = Object.fromEntries(
    Object.entries(req.body ?? {}).filter(([key]) => allowed.includes(key as (typeof allowed)[number]))
  );
  const pin = await Pin.findOneAndUpdate({ _id: req.params.id, userId: req.auth!.userId }, updates, {
    new: true
  });
  if (!pin) {
    return fail(res, "NOT_FOUND", "Pin not found", 404);
  }
  return ok(res, pin);
});

pinsRouter.post("/:id/publish", requireAuth, async (req, res) => {
  const pin = await Pin.findOne({ _id: req.params.id, userId: req.auth!.userId });
  if (!pin) {
    return fail(res, "NOT_FOUND", "Pin not found", 404);
  }

  const published = await publishPin({
    title: pin.title,
    boardId: pin.boardId ?? undefined,
    imageUrl: pin.imageUrl
  });

  pin.pinterestPinId = published.pinterestPinId;
  pin.boardId = published.boardId;
  pin.status = "posted";
  pin.postedAt = new Date();
  await pin.save();

  return ok(res, pin);
});

