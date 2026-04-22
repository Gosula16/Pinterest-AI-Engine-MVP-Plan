import { describe, expect, it } from "vitest";
import { filterAffiliateProducts } from "../src/services/affiliateFilters.js";
import { evaluatePinPerformance } from "../src/services/optimizerService.js";
import { selectNextScheduleSlot } from "../src/services/schedulerService.js";

describe("affiliate filters", () => {
  it("keeps only highly rated products and returns top three", () => {
    const results = filterAffiliateProducts([
      { asin: "1", title: "A", price: "₹1", rating: 4.8, reviews: 1200, affiliateUrl: "#", imageUrl: "" },
      { asin: "2", title: "B", price: "₹1", rating: 3.9, reviews: 9200, affiliateUrl: "#", imageUrl: "" },
      { asin: "3", title: "C", price: "₹1", rating: 4.4, reviews: 640, affiliateUrl: "#", imageUrl: "" },
      { asin: "4", title: "D", price: "₹1", rating: 4.9, reviews: 2200, affiliateUrl: "#", imageUrl: "" }
    ]);

    expect(results).toHaveLength(3);
    expect(results.map((item) => item.asin)).toEqual(["4", "1", "3"]);
  });
});

describe("scheduler slot selection", () => {
  it("returns the next valid weekday slot", () => {
    const next = selectNextScheduleSlot(new Date("2026-04-22T18:10:00"), {
      weekday: ["20:00", "21:00"],
      weekend: ["14:00"]
    });

    expect(next.getHours()).toBe(20);
    expect(next.getMinutes()).toBe(0);
  });
});

describe("optimizer", () => {
  it("splits pins into clone and mutate recommendations", () => {
    const result = evaluatePinPerformance(
      [
        { id: "a", title: "Winner", templateColor: "#00f", ctr: 0.06, impressions: 400 },
        { id: "b", title: "Weak", templateColor: "#f00", ctr: 0.008, impressions: 320 },
        { id: "c", title: "Too new", templateColor: "#0f0", ctr: 0.09, impressions: 20 }
      ],
      { cloneCtr: 0.05, mutateCtr: 0.01, minImpressions: 150 }
    );

    expect(result.clones).toHaveLength(1);
    expect(result.mutations).toHaveLength(1);
    expect(result.suggestedColor).toBe("#00f");
  });
});
