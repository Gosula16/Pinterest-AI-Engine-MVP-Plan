import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.js";
import { apiRateLimit } from "./middleware/rateLimit.js";
import { registerRoutes } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.APP_URL,
      credentials: true
    })
  );
  app.use(helmet());
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());
  app.use(apiRateLimit);
  app.use(
    morgan("dev", {
      skip: (_req, res) => res.statusCode < 400 && env.NODE_ENV === "test"
    })
  );

  app.get("/health", (_req, res) => {
    res.json({ success: true, data: { status: "ok" } });
  });

  registerRoutes(app);
  app.use(errorHandler);
  return app;
}

