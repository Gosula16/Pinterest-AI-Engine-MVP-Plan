import bcrypt from "bcryptjs";
import { Router } from "express";
import { User } from "../models/User.js";
import { ok, fail } from "../utils/api.js";
import { signJwt } from "../utils/auth.js";
import { requireAuth } from "../middleware/auth.js";
import { AuditLog } from "../models/AuditLog.js";
import { Keyword } from "../models/Keyword.js";
import { Pin } from "../models/Pin.js";
import { PipelineRun } from "../models/PipelineRun.js";
import { ConnectionSecret } from "../models/ConnectionSecret.js";
import { Subscription } from "../models/Subscription.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return fail(res, "VALIDATION_ERROR", "Email and password are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return fail(res, "CONFLICT", "Account already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  await Subscription.create({ userId: user._id, plan: "free", status: "inactive" });
  const token = signJwt({ userId: user._id.toString(), email: user.email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });
  return ok(res, { id: user._id.toString(), email: user.email, plan: user.plan });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  const user = await User.findOne({ email });

  if (!user || !password || !(await bcrypt.compare(password, user.passwordHash))) {
    return fail(res, "INVALID_CREDENTIALS", "Invalid email or password", 401);
  }

  const token = signJwt({ userId: user._id.toString(), email: user.email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false });
  return ok(res, { id: user._id.toString(), email: user.email, plan: user.plan });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("token");
  return ok(res, { loggedOut: true });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.auth!.userId).lean();
  if (!user) {
    return fail(res, "NOT_FOUND", "User not found", 404);
  }

  return ok(res, {
    id: user._id.toString(),
    email: user.email,
    plan: user.plan,
    settings: user.settings,
    pinterest: user.pinterest
  });
});

authRouter.delete("/delete-account", requireAuth, async (req, res) => {
  const userId = req.auth!.userId;
  await Promise.all([
    Keyword.deleteMany({ userId }),
    Pin.deleteMany({ userId }),
    PipelineRun.deleteMany({ userId }),
    ConnectionSecret.deleteMany({ userId }),
    Subscription.deleteMany({ userId }),
    User.findByIdAndDelete(userId),
    AuditLog.create({ userId, event: "account_deleted" })
  ]);
  res.clearCookie("token");
  return ok(res, { deleted: true });
});

