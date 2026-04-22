import type {
  AffiliateProductDto,
  DashboardOverviewDto,
  KeywordDto,
  PipelineRunDto,
  PinDto,
  PipelineStageDto
} from "@pinengine/contracts";

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

export const mockProducts: AffiliateProductDto[] = [
  {
    asin: "B0A123",
    title: "JBL Tune 510BT",
    price: "₹1,799",
    rating: 4.6,
    reviews: 7240,
    affiliateUrl: "https://example.com/affiliate/jbl",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    asin: "B0A124",
    title: "Logitech M235",
    price: "₹899",
    rating: 4.4,
    reviews: 3901,
    affiliateUrl: "https://example.com/affiliate/mouse",
    imageUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80"
  }
];

export const mockPins: PinDto[] = [
  {
    id: "pin-1",
    keywordId: "kw-1",
    title: "10 AI Tools Every Student Needs in 2025",
    description: "Save time, study faster, and build a better workflow with these AI tools every student should try this year.",
    hashtags: ["#aitools", "#studenttips", "#productivity", "#studyhacks", "#techfinds"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    boardId: "board-1",
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    ctrEstimate: 0.042,
    templateColor: "#06b6d4",
    affiliateProducts: mockProducts,
    analytics: {
      impressions: 840,
      saves: 51,
      clicks: 35,
      ctr: 0.0417
    }
  }
];

export function mockPipelineStages(): PipelineStageDto[] {
  return [
    { stage: "trend_discovery", status: "completed", message: "Fetched 24 keywords" },
    { stage: "content_generation", status: "completed", message: "Generated 18 pins" },
    { stage: "affiliate_match", status: "running", message: "Matching top products" },
    { stage: "image_render", status: "idle", message: "Waiting for content" },
    { stage: "queue_schedule", status: "idle", message: "Not started" }
  ];
}

export function mockOverview(): DashboardOverviewDto {
  return {
    stats: {
      pinsPublished: 142,
      avgCtr: 3.8,
      affiliateClicks: 2341,
      estimatedRevenue: 4820
    },
    pipeline: mockPipelineStages(),
    queue: mockPins,
    ctrSeries: [
      { label: "Mon", ctr: 2.8, saves: 1.7 },
      { label: "Tue", ctr: 3.1, saves: 2.0 },
      { label: "Wed", ctr: 2.9, saves: 1.8 },
      { label: "Thu", ctr: 3.6, saves: 2.4 },
      { label: "Fri", ctr: 4.0, saves: 3.0 },
      { label: "Sat", ctr: 5.0, saves: 3.8 },
      { label: "Sun", ctr: 3.9, saves: 2.7 }
    ],
    topProducts: mockProducts,
    trendingNiches: [
      "ai tools for students",
      "budget laptop 2025",
      "coding desk setup",
      "wfh accessories",
      "python tips",
      "digital planner"
    ],
    activityLog: [
      { id: "log-1", level: "ok", message: "Fetched 24 keywords from Google Trends", createdAt: new Date().toISOString() },
      { id: "log-2", level: "ai", message: "OpenAI generated 18 titles and descriptions", createdAt: new Date().toISOString() },
      { id: "log-3", level: "ok", message: "Amazon matched 14 relevant products", createdAt: new Date().toISOString() }
    ]
  };
}

export function mockPipelineRun(): PipelineRunDto {
  return {
    id: "run-1",
    niche: "ai tools for students",
    keywordCount: 24,
    status: "running",
    stages: mockPipelineStages(),
    createdAt: new Date().toISOString()
  };
}

