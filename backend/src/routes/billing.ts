import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { User } from "../models/User.js";
import { Subscription } from "../models/Subscription.js";
import { createCheckoutSession, createPortalSession, getBillingState } from "../services/billingService.js";
import { ok, fail } from "../utils/api.js";

export const billingRouter = Router();

billingRouter.get("/state", requireAuth, async (req, res) => {
  return ok(res, await getBillingState(req.auth!.userId));
});

billingRouter.post("/checkout", requireAuth, async (req, res) => {
  const user = await User.findById(req.auth!.userId).lean();
  if (!user) {
    return fail(res, "NOT_FOUND", "User not found", 404);
  }
  return ok(res, await createCheckoutSession(user._id.toString(), user.email));
});

billingRouter.post("/portal", requireAuth, async (req, res) => {
  const subscription = await Subscription.findOne({ userId: req.auth!.userId }).lean();
  return ok(res, await createPortalSession(subscription?.stripeCustomerId));
});

