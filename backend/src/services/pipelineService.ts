import { PipelineRun } from "../models/PipelineRun.js";
import { Pin } from "../models/Pin.js";
import { discoverTrends } from "./trendService.js";
import { generatePinCopy } from "./contentService.js";
import { searchAffiliateProducts } from "./amazonService.js";
import { renderPinImage } from "./imageService.js";
import { User } from "../models/User.js";
import { selectNextScheduleSlot } from "./schedulerService.js";

const stageOrder = [
  "trend_discovery",
  "content_generation",
  "affiliate_match",
  "image_render",
  "pin_assembly",
  "queue_schedule"
] as const;

export async function runPipeline(userId: string, niche: string) {
  const user = await User.findById(userId).lean();
  const run = await PipelineRun.create({
    userId,
    niche,
    keywordCount: 0,
    status: "running",
    stages: stageOrder.map((stage) => ({ stage, status: "idle" }))
  });

  const markStage = async (
    stage: (typeof stageOrder)[number],
    status: "running" | "completed" | "failed",
    message?: string
  ) => {
    await PipelineRun.updateOne(
      { _id: run._id, "stages.stage": stage },
      {
        $set: {
          "stages.$.status": status,
          "stages.$.message": message,
          ...(status === "running" ? { "stages.$.startedAt": new Date() } : {}),
          ...(status === "completed" || status === "failed"
            ? { "stages.$.completedAt": new Date() }
            : {})
        }
      }
    );
  };

  try {
    await markStage("trend_discovery", "running");
    const keywords = await discoverTrends(userId, niche);
    await markStage("trend_discovery", "completed", `Fetched ${keywords.length} keywords`);

    const primaryKeyword = keywords[0];
    await markStage("content_generation", "running");
    const copies = await generatePinCopy(primaryKeyword.keyword);
    await markStage("content_generation", "completed", `Generated ${copies.length} pin drafts`);

    const primaryCopy = copies[0];
    await markStage("affiliate_match", "running");
    const products = await searchAffiliateProducts(primaryKeyword.keyword);
    await markStage("affiliate_match", "completed", `Matched ${products.length} products`);

    await markStage("image_render", "running");
    const imageUrl = await renderPinImage({
      title: primaryCopy.title,
      keyword: primaryKeyword.keyword,
      color: "#1d4ed8"
    });
    await markStage("image_render", "completed", "Rendered 1000x1500 pin image");

    await markStage("pin_assembly", "running");
    const pin = await Pin.create({
      userId,
      keywordId: primaryKeyword._id,
      title: primaryCopy.title,
      description: primaryCopy.description,
      hashtags: primaryCopy.hashtags,
      imageUrl,
      affiliateProducts: products,
      status: "draft",
      templateColor: "#1d4ed8",
      ctrEstimate: 0.038
    });
    await markStage("pin_assembly", "completed", "Draft pin assembled");

    await markStage("queue_schedule", "running");
    pin.status = "queued";
    pin.scheduledFor = selectNextScheduleSlot(new Date(), user?.settings?.postingWindows ?? {
      weekday: ["20:00", "21:00", "22:00"],
      weekend: ["14:00", "15:00", "16:00"]
    });
    await pin.save();
    await markStage("queue_schedule", "completed", "Pin queued for schedule");

    run.status = "completed";
    run.keywordCount = keywords.length;
    await run.save();
    return run;
  } catch (error) {
    run.status = "failed";
    run.errorSummary = error instanceof Error ? error.message : "Unknown pipeline error";
    await run.save();
    throw error;
  }
}

