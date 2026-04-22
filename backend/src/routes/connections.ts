import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { ConnectionSecret } from "../models/ConnectionSecret.js";
import { encryptSecret } from "../utils/crypto.js";
import { ok } from "../utils/api.js";
import { listBoards } from "../services/pinterestService.js";

export const connectionsRouter = Router();

connectionsRouter.get("/pinterest/boards", requireAuth, async (_req, res) => {
  return ok(res, await listBoards());
});

connectionsRouter.put("/:provider", requireAuth, async (req, res) => {
  const provider = req.params.provider;
  const payload = Object.fromEntries(
    Object.entries(req.body ?? {}).map(([key, value]) => [
      key,
      typeof value === "string" ? encryptSecret(value) : value
    ])
  );

  const secret = await ConnectionSecret.findOneAndUpdate(
    { userId: req.auth!.userId, provider },
    { userId: req.auth!.userId, provider, payload },
    { upsert: true, new: true }
  );

  return ok(res, { id: secret._id.toString(), provider: secret.provider, saved: true });
});

