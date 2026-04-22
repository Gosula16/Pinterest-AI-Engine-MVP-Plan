import OpenAI from "openai";
import { env } from "../config/env.js";

const fallbackPins = (keyword: string) => [
  {
    title: `10 ${keyword} ideas for 2026`,
    description: `Discover practical ${keyword} picks that are easy to save, compare, and shop when you want better results with less effort.`,
    hashtags: ["#pinteresttips", "#affiliatefinds", "#digitalgrowth", "#smartshopping", "#creatorworkflow"]
  },
  {
    title: `Best ${keyword} options to save right now`,
    description: `A curated set of ${keyword} recommendations built for Pinterest clicks, saves, and better conversion intent.`,
    hashtags: ["#creatorbusiness", "#contentengine", "#workflow", "#growthsystem", "#productivity"]
  }
];

const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

export async function generatePinCopy(keyword: string) {
  if (!openai) {
    return fallbackPins(keyword);
  }

  const prompt = `
You are a Pinterest SEO expert and copywriter.
Return valid JSON only.
Generate 3 Pinterest pins for the keyword "${keyword}".
Each pin must include title, description, and hashtags.
Title max 100 chars. Description 150-200 chars. Hashtags must be 5 strings.
  `.trim();

  try {
    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,
      input: prompt
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : fallbackPins(keyword);
  } catch {
    return fallbackPins(keyword);
  }
}

