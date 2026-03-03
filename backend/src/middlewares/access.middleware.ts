import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth.type.js";
import { catchAllError } from "../lib/utils/error.utils.js";
import ResponseUtils from "../lib/utils/response.utils.js";

export default class AccessMiddleware {
  static async adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
    const role = req.user?.role;
    if (!role)
      return ResponseUtils.errorClientResponse(400, res, "role is required!");
    try {
      if (role !== "admin")
        return ResponseUtils.errorClientResponse(403, res, "access denied!");
      next();
    } catch (err) {
      return catchAllError(res, err);
    }
  }
}
