import type { BillingStateDto, DashboardOverviewDto, KeywordDto, PinDto, PipelineRunDto } from "./types";

export const mockOverview: DashboardOverviewDto = {
  stats: {
    pinsPublished: 142,
    avgCtr: 3.8,
    affiliateClicks: 2341,
    estimatedRevenue: 4820
  },
  pipeline: [
    { stage: "trend_discovery", status: "completed", message: "24 keywords fetched" },
    { stage: "content_generation", status: "completed", message: "18 / 24 generated" },
    { stage: "affiliate_match", status: "completed", message: "14 / 18 matched" },
    { stage: "image_render", status: "running", message: "9 / 14 rendered" },
    { stage: "queue_schedule", status: "idle", message: "pending" }
  ],
  queue: [
    {
      id: "pin-1",
      title: "10 AI Tools Every Student Needs in 2025",
      description: "A curated guide to study, write, and research faster with AI.",
      hashtags: ["#aitools", "#studenttips", "#workflow", "#studyhacks", "#pinterest"],
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
      boardId: "board-1",
      status: "scheduled",
      scheduledFor: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      ctrEstimate: 0.042,
      templateColor: "#14c4ff",
      affiliateProducts: [],
      analytics: { impressions: 820, saves: 44, clicks: 35, ctr: 0.042 }
    },
    {
      id: "pin-2",
      title: "Best Budget Headphones Under Rs3000",
      description: "Affordable sound picks with strong reviews and gifting potential.",
      hashtags: ["#budgettech", "#headphones", "#amazonfinds", "#creatorengine", "#saveit"],
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      boardId: "board-2",
      status: "posted",
      postedAt: new Date().toISOString(),
      ctrEstimate: 0.051,
      templateColor: "#56d364",
      affiliateProducts: [],
      analytics: { impressions: 1440, saves: 76, clicks: 73, ctr: 0.051 }
    }
  ],
  ctrSeries: [
    { label: "Mon", ctr: 2.8, saves: 1.7 },
    { label: "Tue", ctr: 3.1, saves: 2.1 },
    { label: "Wed", ctr: 2.9, saves: 1.9 },
    { label: "Thu", ctr: 3.6, saves: 2.5 },
    { label: "Fri", ctr: 4.0, saves: 3.0 },
    { label: "Sat", ctr: 5.0, saves: 3.8 },
    { label: "Sun", ctr: 3.9, saves: 2.7 }
  ],
  topProducts: [
    {
      asin: "1",
      title: "JBL Tune 510BT",
      price: "Rs180",
      rating: 4.6,
      reviews: 1020,
      affiliateUrl: "#",
      imageUrl: ""
    },
    {
      asin: "2",
      title: "Logitech M235",
      price: "Rs90",
      rating: 4.4,
      reviews: 1440,
      affiliateUrl: "#",
      imageUrl: ""
    }
  ],
  trendingNiches: [
    "ai tools for students",
    "budget laptop 2025",
    "coding desk setup",
    "wfh accessories",
    "python tips",
    "digital planner",
    "freelance dev tools"
  ],
  activityLog: [
    { id: "1", level: "ok", message: "Fetched 24 keywords from Google Trends", createdAt: new Date().toISOString() },
    { id: "2", level: "ai", message: "OpenAI generated 18 pin titles and descriptions", createdAt: new Date().toISOString() },
    { id: "3", level: "ok", message: "Amazon matched 14 affiliate products", createdAt: new Date().toISOString() }
  ]
};

export const mockKeywords: KeywordDto[] = [
  {
    id: "kw-1",
    keyword: "ai tools for students",
    trendScore: 87,
    source: "google",
    status: "approved",
    approved: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "kw-2",
    keyword: "budget laptop 2025",
    trendScore: 74,
    source: "manual",
    status: "discovered",
    approved: false,
    createdAt: new Date().toISOString()
  }
];

export const mockPins: PinDto[] = mockOverview.queue;

export const mockRuns: PipelineRunDto[] = [
  {
    id: "run-1",
    niche: "ai tools for students",
    keywordCount: 24,
    status: "running",
    createdAt: new Date().toISOString(),
    stages: mockOverview.pipeline
  }
];

export const mockBilling: BillingStateDto = {
  plan: "free",
  status: "inactive"
};

