import axios from "axios";
import { Keyword } from "../models/Keyword.js";
import { env } from "../config/env.js";

type TrendResult = {
  keyword: string;
  trend_score: number;
  source: "google" | "pinterest" | "manual";
};

const fallbackKeywords: TrendResult[] = [
  { keyword: "ai tools for students", trend_score: 87, source: "google" },
  { keyword: "budget laptop 2025", trend_score: 74, source: "manual" },
  { keyword: "coding desk setup", trend_score: 69, source: "manual" },
  { keyword: "wfh accessories", trend_score: 64, source: "manual" }
];

export async function discoverTrends(userId: string, niche: string) {
  let results = fallbackKeywords;

  try {
    const response = await axios.get<{ keywords: TrendResult[] }>(
      `${env.PYTHON_ENGINE_URL}/trends/discover`,
      { params: { seed: niche }, timeout: 10_000 }
    );
    results = response.data.keywords;
  } catch {
    results = fallbackKeywords.map((item) => ({
      ...item,
      keyword: item.keyword.includes(niche) ? item.keyword : `${niche} ${item.keyword}`
    }));
  }

  await Keyword.deleteMany({ userId, keyword: { $regex: `^${niche}`, $options: "i" } });
  const created = await Keyword.insertMany(
    results.map((item) => ({
      userId,
      keyword: item.keyword,
      trendScore: item.trend_score,
      source: item.source,
      status: "discovered",
      approved: false
    }))
  );

  return created;
}

export async function listKeywords(userId: string) {
  return Keyword.find({ userId }).sort({ createdAt: -1 }).lean();
}

