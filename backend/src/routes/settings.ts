import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { ok, fail } from "../utils/api.js";

export const settingsRouter = Router();

settingsRouter.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.auth!.userId).lean();
  if (!user) {
    return fail(res, "NOT_FOUND", "User not found", 404);
  }
  return ok(res, user.settings);
});

settingsRouter.patch("/", requireAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.auth!.userId,
    { $set: { settings: req.body } },
    { new: true }
  ).lean();
  if (!user) {
    return fail(res, "NOT_FOUND", "User not found", 404);
  }
  return ok(res, user.settings);
});

