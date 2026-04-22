import type { NextFunction, Request, Response } from "express";
import { fail } from "../utils/api.js";
import { verifyJwt } from "../utils/auth.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const bearer = req.headers.authorization?.replace("Bearer ", "");
  const token = req.cookies?.token ?? bearer;

  if (!token) {
    return fail(res, "UNAUTHORIZED", "Authentication required", 401);
  }

  try {
    req.auth = verifyJwt(token);
    next();
  } catch {
    return fail(res, "UNAUTHORIZED", "Invalid or expired session", 401);
  }
}

