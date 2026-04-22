import { describe, expect, it } from "vitest";
import { mockOverview } from "../lib/mock";

describe("dashboard mock data", () => {
  it("keeps the main sections populated", () => {
    expect(mockOverview.pipeline.length).toBeGreaterThan(0);
    expect(mockOverview.queue.length).toBeGreaterThan(0);
    expect(mockOverview.trendingNiches.length).toBeGreaterThan(0);
  });
});
