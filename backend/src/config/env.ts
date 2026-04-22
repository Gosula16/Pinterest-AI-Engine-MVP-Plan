import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  JWT_SECRET: z.string().min(12),
  ENCRYPTION_KEY: z.string().min(32),
  MONGO_URI: z.string().min(1),
  PYTHON_ENGINE_URL: z.string().url().default("http://localhost:8100"),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  PINTEREST_APP_ID: z.string().optional(),
  PINTEREST_APP_SECRET: z.string().optional(),
  PINTEREST_REDIRECT_URI: z.string().url().optional(),
  AMAZON_CREATORS_API_KEY: z.string().optional(),
  AMAZON_CREATORS_API_SECRET: z.string().optional(),
  AMAZON_ASSOCIATE_TAG: z.string().optional(),
  AMAZON_MARKETPLACE: z.string().default("amazon.in"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_PRO_MONTHLY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  DISABLE_PINTEREST_SUGGEST_SCRAPER: z.coerce.boolean().default(true)
});

export const env = envSchema.parse(process.env);

