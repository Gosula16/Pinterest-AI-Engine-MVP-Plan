import type {
  BillingStateDto,
  DashboardOverviewDto,
  KeywordDto,
  PinDto,
  PipelineRunDto
} from "@pinengine/contracts";
import { mockBilling, mockKeywords, mockOverview, mockPins, mockRuns } from "./mock";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function safeFetch<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      }
    });
    if (!response.ok) {
      return fallback;
    }
    const payload = (await response.json()) as { data: T };
    return payload.data;
  } catch {
    return fallback;
  }
}

export async function getOverview() {
  return safeFetch<DashboardOverviewDto>("/api/dashboard/overview", mockOverview);
}

export async function getPipelineRuns() {
  return safeFetch<PipelineRunDto[]>("/api/dashboard/pipeline-runs", mockRuns);
}

export async function getKeywords() {
  return safeFetch<KeywordDto[]>("/api/trends", mockKeywords);
}

export async function getPins() {
  return safeFetch<PinDto[]>("/api/pins", mockPins);
}

export async function getPin(id: string) {
  return safeFetch<PinDto>(`/api/pins/${id}`, mockPins[0]);
}

export async function getBillingState() {
  return safeFetch<BillingStateDto>("/api/billing/state", mockBilling);
}

