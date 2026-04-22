import { Pin } from "../models/Pin.js";
import { getAnalytics } from "./pinterestService.js";

export async function syncAnalytics(userId: string) {
  const pins = await Pin.find({ userId, status: { $in: ["scheduled", "posted", "queued"] } });
  const metrics = await getAnalytics(pins.map((pin) => pin._id.toString()));

  for (const pin of pins) {
    const metric = metrics.find((item) => item.pinId === pin._id.toString());
    if (!metric) {
      continue;
    }

    pin.analytics = {
      impressions: metric.impressions,
      saves: metric.saves,
      clicks: metric.clicks,
      ctr: metric.impressions > 0 ? metric.clicks / metric.impressions : 0,
      lastFetchedAt: new Date()
    };

    if (pin.analytics.impressions >= 150 && pin.analytics.ctr < 0.01) {
      pin.flagged = true;
    }

    await pin.save();
  }

  return Pin.find({ userId }).sort({ updatedAt: -1 }).lean();
}

