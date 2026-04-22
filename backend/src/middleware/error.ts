import type { NextFunction, Request, Response } from "express";
import { fail } from "../utils/api.js";

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);
  return fail(res, "INTERNAL_ERROR", "Something went wrong", 500);
}

