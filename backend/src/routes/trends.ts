import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { Keyword } from "../models/Keyword.js";
import { discoverTrends, listKeywords } from "../services/trendService.js";
import { ok, fail } from "../utils/api.js";

export const trendsRouter = Router();

trendsRouter.get("/", requireAuth, async (req, res) => {
  const keywords = await listKeywords(req.auth!.userId);
  return ok(
    res,
    keywords.map((keyword) => ({
      id: keyword._id.toString(),
      keyword: keyword.keyword,
      trendScore: keyword.trendScore,
      source: keyword.source,
      status: keyword.status,
      approved: keyword.approved,
      createdAt: keyword.createdAt.toISOString()
    }))
  );
});

trendsRouter.post("/discover", requireAuth, async (req, res) => {
  const niche = (req.body?.niche as string | undefined)?.trim();
  if (!niche) {
    return fail(res, "VALIDATION_ERROR", "Niche is required");
  }
  const keywords = await discoverTrends(req.auth!.userId, niche);
  return ok(res, keywords);
});

trendsRouter.patch("/:id", requireAuth, async (req, res) => {
  const { approved, status } = req.body as { approved?: boolean; status?: string };
  const keyword = await Keyword.findOneAndUpdate(
    { _id: req.params.id, userId: req.auth!.userId },
    {
      $set: {
        ...(typeof approved === "boolean" ? { approved } : {}),
        ...(status ? { status } : {})
      }
    },
    { new: true }
  );

  if (!keyword) {
    return fail(res, "NOT_FOUND", "Keyword not found", 404);
  }

  return ok(res, keyword);
});

