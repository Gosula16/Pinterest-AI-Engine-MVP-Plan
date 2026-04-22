import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Pin } from "../models/Pin.js";
import { syncAnalytics } from "../services/analyticsService.js";
import { ok } from "../utils/api.js";

export const analyticsRouter = Router();

analyticsRouter.get("/", requireAuth, async (req, res) => {
  const pins = await Pin.find({ userId: req.auth!.userId }).lean();
  const totalImpressions = pins.reduce((sum, pin) => sum + (pin.analytics?.impressions ?? 0), 0);
  const totalClicks = pins.reduce((sum, pin) => sum + (pin.analytics?.clicks ?? 0), 0);
  const totalSaves = pins.reduce((sum, pin) => sum + (pin.analytics?.saves ?? 0), 0);
  const ctr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

  return ok(res, {
    totalImpressions,
    totalClicks,
    totalSaves,
    ctr,
    topPins: pins.sort((a, b) => (b.analytics?.ctr ?? 0) - (a.analytics?.ctr ?? 0)).slice(0, 5)
  });
});

analyticsRouter.post("/sync", requireAuth, async (req, res) => {
  const pins = await syncAnalytics(req.auth!.userId);
  return ok(res, pins);
});

