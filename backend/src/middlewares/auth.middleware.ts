import { Response, NextFunction } from "express";
import { catchAllError } from "../lib/utils/error.utils";
import ResponseUtils from "../lib/utils/response.utils";
import { AuthRequest } from "../types/auth.type";
import AuthService from "../modules/auth/auth.service";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  static async verifyUser(req: AuthRequest, res: Response, next: NextFunction) {
    // access token validation
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return ResponseUtils.errorClientResponse(401, res, "Unauthorized!");
    if (!authHeader.startsWith("Bearer "))
      return ResponseUtils.errorClientResponse(
        401,
        res,
        "Invalid token format!",
      );
    const accessToken = authHeader.split(" ")[1];

    // refresh token validation
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return ResponseUtils.errorClientResponse(401, res, "Unauthorized!");
    let refreshDecoded;
    try {
      // verify token always throws error if token is invalid or expired, so we can catch it and handle it accordingly
      refreshDecoded = AuthService.verifyRefreshToken(refreshToken);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return ResponseUtils.errorClientResponse(401, res, "Unauthorized!");
      }
      return catchAllError(res, err);
    }
    if (
      !refreshDecoded?.userId ||
      !refreshDecoded?.email ||
      !refreshDecoded?.role
    )
      return ResponseUtils.errorClientResponse(
        401,
        res,
        "Unauthorized! and id or email or role is missing in refresh token",
      );

    // access token validation
    try {
      // verify token always throws error if token is invalid or expired, so we can catch it and handle it accordingly
      const accessDecoded = AuthService.verifyAccessToken(accessToken);
      req.user = accessDecoded;
      return next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        // if refresh token is valid, generate new access token
        const newAccessToken = AuthService.createAccessToken(
          refreshDecoded.userId,
          refreshDecoded.role,
        );
        if (!newAccessToken)
          return ResponseUtils.errorServerResponse(
            500,
            res,
            "failed to generate token!",
          );
        res.setHeader("X-new-access-token", `Bearer ${newAccessToken}`);
        req.user = {
          userId: refreshDecoded.userId,
          role: refreshDecoded.role,
        };
        return next();
      }
      return catchAllError(res, err);
    }
  }
}
