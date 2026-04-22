import { Pin } from "../models/Pin.js";
import { getAnalytics } from "./pinterestService.js";
import { evaluatePinPerformance } from "./optimizerService.js";
import { User } from "../models/User.js";

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

  const refreshedPins = await Pin.find({ userId }).sort({ updatedAt: -1 }).lean();
  const user = await User.findById(userId).lean();
  const thresholds = user?.settings?.automationThresholds ?? {
    cloneCtr: 0.05,
    mutateCtr: 0.01,
    minImpressions: 150
  };

  const evaluation = evaluatePinPerformance(
    refreshedPins.map((pin) => ({
      id: pin._id.toString(),
      title: pin.title,
      templateColor: pin.templateColor,
      ctr: pin.analytics?.ctr ?? 0,
      impressions: pin.analytics?.impressions ?? 0
    })),
    thresholds
  );

  return {
    pins: refreshedPins,
    recommendations: evaluation
  };
}

