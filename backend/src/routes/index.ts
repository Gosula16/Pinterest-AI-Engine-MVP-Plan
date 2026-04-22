import type { Express } from "express";
import { authRouter } from "./auth.js";
import { analyticsRouter } from "./analytics.js";
import { billingRouter } from "./billing.js";
import { connectionsRouter } from "./connections.js";
import { dashboardRouter } from "./dashboard.js";
import { pinsRouter } from "./pins.js";
import { settingsRouter } from "./settings.js";
import { trendsRouter } from "./trends.js";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/trends", trendsRouter);
  app.use("/api/pins", pinsRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/connections", connectionsRouter);
  app.use("/api/billing", billingRouter);
  app.use("/api/settings", settingsRouter);
}
