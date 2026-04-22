export type ApiEnvelope<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorEnvelope = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type PipelineStage =
  | "trend_discovery"
  | "content_generation"
  | "affiliate_match"
  | "image_render"
  | "pin_assembly"
  | "queue_schedule"
  | "publish"
  | "analytics_sync";

export type PipelineStageStatus = "idle" | "running" | "completed" | "failed" | "skipped";
export type PinStatus = "draft" | "queued" | "scheduled" | "posted" | "failed";
export type SubscriptionPlan = "free" | "pro";
export type KeywordStatus = "discovered" | "approved" | "processing" | "done" | "rejected";

export interface KeywordDto {
  id: string;
  keyword: string;
  trendScore: number;
  source: "google" | "pinterest" | "manual";
  status: KeywordStatus;
  approved: boolean;
  createdAt: string;
}

export interface AffiliateProductDto {
  asin: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  affiliateUrl: string;
  imageUrl: string;
}

export interface PinDto {
  id: string;
  keywordId?: string;
  title: string;
  description: string;
  hashtags: string[];
  imageUrl: string;
  boardId?: string;
  status: PinStatus;
  scheduledFor?: string;
  postedAt?: string;
  ctrEstimate?: number;
  templateColor: string;
  affiliateProducts: AffiliateProductDto[];
  analytics: {
    impressions: number;
    saves: number;
    clicks: number;
    ctr: number;
  };
}

export interface PipelineStageDto {
  stage: PipelineStage;
  status: PipelineStageStatus;
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

export interface PipelineRunDto {
  id: string;
  niche: string;
  keywordCount: number;
  status: "queued" | "running" | "completed" | "failed";
  stages: PipelineStageDto[];
  createdAt: string;
}

export interface DashboardOverviewDto {
  stats: {
    pinsPublished: number;
    avgCtr: number;
    affiliateClicks: number;
    estimatedRevenue: number;
  };
  pipeline: PipelineStageDto[];
  queue: PinDto[];
  ctrSeries: Array<{ label: string; ctr: number; saves: number }>;
  topProducts: AffiliateProductDto[];
  trendingNiches: string[];
  activityLog: Array<{ id: string; level: "ok" | "ai" | "warn"; message: string; createdAt: string }>;
}

export interface BillingStateDto {
  plan: SubscriptionPlan;
  status: "inactive" | "trialing" | "active" | "past_due" | "canceled";
  renewalDate?: string;
}

