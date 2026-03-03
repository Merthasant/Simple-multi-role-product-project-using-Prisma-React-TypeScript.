import { Request, Response } from "express";
import { AuthRequest } from "../../types/auth.type.js";
import { CreateUserBodyType, UserInput } from "../../types/user.type.js";
import { catchAllError } from "../../lib/utils/error.utils.js";
import AuthService from "./auth.service.js";
import ResponseUtils from "../../lib/utils/response.utils.js";
import ValidationUtils from "../../lib/utils/validation.utils.js";

export default class AuthController {
  // set refresh token in cookie
  static setRefreshTokenInCookie(res: Response, refreshToken: string) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
  }

  // register
  static async register(req: Request, res: Response) {
    const { name, email, password, confPassword, role }: CreateUserBodyType =
      req.body;
    const device = req.headers["user-agent"] || "unknown";
    if (!name || !email || !password || !confPassword || !role)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "all data is required!",
      );
    try {
      // validation
      if (!ValidationUtils.isValidEmail(email))
        return ResponseUtils.errorClientResponse(
          400,
          res,
          "invalid email format!",
        );
      ValidationUtils.validationPassword(password);
      ValidationUtils.passwordAndConfPasswordMatched(password, confPassword);

      const userData = await AuthService.register({
        name,
        email,
        password,
        role,
      });

      const token = await AuthService.getNewToken(
        userData.id,
        userData.email,
        userData.role,
        device,
      );
      if (!token)
        return ResponseUtils.errorServerResponse(
          500,
          res,
          "failed to generate token!",
        );

      AuthController.setRefreshTokenInCookie(res, token.refreshToken);

      return ResponseUtils.successResponse(
        201,
        res,
        "user register successfully",
        {
          data: userData,
          token: {
            accessToken: token.accessToken,
          },
        },
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // login
  static async login(req: Request, res: Response) {
    const { email, password }: UserInput = req.body;
    const device = req.headers["user-agent"] || "unknown";
    if (!email || !password)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "email and password are required!",
      );
    if (!ValidationUtils.isValidEmail(email))
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "invalid email format!",
      );
    try {
      const userData = await AuthService.login(email, password);
      if (!userData)
        return ResponseUtils.errorClientResponse(404, res, "user not found!");
      // set refresh token in cookie
      const token = await AuthService.getNewToken(
        userData.id,
        userData.email,
        userData.role,
        device,
      );
      if (!token)
        return ResponseUtils.errorServerResponse(
          500,
          res,
          "failed to generate token!",
        );
      AuthController.setRefreshTokenInCookie(res, token.refreshToken);
      return ResponseUtils.successResponse(
        200,
        res,
        "user login successfully",
        {
          data: userData,
          token: {
            accessToken: token.accessToken,
          },
        },
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // logout
  static async logout(req: AuthRequest, res: Response) {
    const { refreshToken } = req.cookies;
    const device = req.headers["user-agent"] || "unknown";
    if (!refreshToken)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "refresh token is required!",
      );
    try {
      const logoutData = await AuthService.logout(refreshToken, device);
      res.clearCookie("refreshToken");
      return ResponseUtils.successResponse(
        200,
        res,
        "user logged out successfully",
        logoutData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // me
  static async me(req: AuthRequest, res: Response) {
    const id = req.user?.userId;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "id is required!");
    try {
      const getMe = await AuthService.me(id);
      return ResponseUtils.successResponse(
        200,
        res,
        "User authorization successfully",
        getMe,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }
}
