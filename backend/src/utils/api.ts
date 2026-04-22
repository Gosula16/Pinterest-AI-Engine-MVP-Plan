import type { Response } from "express";

export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>) {
  return res.json({ success: true, data, ...(meta ? { meta } : {}) });
}

export function fail(res: Response, code: string, message: string, status = 400, details?: unknown) {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  });
}

