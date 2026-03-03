import { prisma } from "../../lib/prisma.js";
import jwt from "jsonwebtoken";
import { UserInput } from "../../types/user.type.js";
import ValidationUtils from "../../lib/utils/validation.utils.js";
import argon2 from "argon2";
import UserService from "../user/user.service.js";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "../../lib/utils/error.utils.js";
import {
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
  refreshTokenExpired,
} from "../../lib/jwt/jwt.js";
import { AccessTokenType, RefreshTokenType } from "../../types/auth.type.js";
import { RefreshTokenTableType } from "../../types/token.type.js";

export default class AuthService {
  // create refresh token
  static createRefreshToken(userId: string, email: string, role: string) {
    const refreshToken = jwt.sign({ userId, email, role }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    return refreshToken;
  }

  // create access token
  static createAccessToken(userId: string, role: string) {
    const accessToken = jwt.sign({ userId, role }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    return accessToken;
  }

  // add Refresh Token
  static async addRefreshToken(
    refreshToken: string,
    userId: string,
    expiredAt: Date,
    device: string,
  ) {
    return await prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiredAt, device },
    });
  }

  // verify access token
  static verifyAccessToken(accessToken: string) {
    if (!accessToken) throw new ValidationError("access token is required!");
    return jwt.verify(accessToken, JWT_ACCESS_SECRET) as AccessTokenType;
  }

  // verify refresh token
  static verifyRefreshToken(refreshToken: string) {
    if (!refreshToken) throw new ValidationError("refresh token is required!");
    return jwt.verify(refreshToken, JWT_REFRESH_SECRET) as RefreshTokenType;
  }

  // get refresh token
  static async getRefreshToken(refreshToken: string, device: string) {
    return await prisma.refreshToken.findUnique({
      // why user refresh token?. because for multi scalable program
      where: { token: refreshToken, device },
    });
  }

  // update refresh token
  static async updateRefreshToken(
    refreshToken: string,
    device: string,
    data: {
      is_revoked?: boolean;
      newRefreshToken?: string;
      expiredAt?: Date;
      device?: string;
    },
  ) {
    const refreshTokenData = await this.getRefreshToken(refreshToken, device);
    const container: RefreshTokenTableType = {
      token: data.newRefreshToken ?? refreshTokenData?.token,
      is_revoked: data.is_revoked ?? refreshTokenData?.is_revoked,
      expiredAt: data.expiredAt ?? refreshTokenData?.expiredAt,
      device: data.device ?? refreshTokenData?.device,
    };
    return await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: container,
    });
  }

  // get user by id include refresh token
  static async getUserByIdIncludeRefreshToken(id: string) {
    if (!id) throw new ValidationError("id required!");
    return await prisma.user.findUnique({
      where: { id },
      include: {
        refreshToken: {
          select: { token: true, expiredAt: true, device: true },
        },
      },
    });
  }

  // get new token
  static async getNewToken(
    userId: string,
    email: string,
    role: "user" | "admin",
    device: string,
  ) {
    const accessToken = this.createAccessToken(userId, role);
    const refreshToken = this.createRefreshToken(userId, email, role);
    await this.addRefreshToken(
      refreshToken,
      userId,
      refreshTokenExpired,
      device,
    );
    return { accessToken, refreshToken };
  }

  // get user by email include refresh token
  static async getUserByEmailIncludeRefreshToken(email: string) {
    if (!email) throw new ValidationError("email required!");
    if (!ValidationUtils.isValidEmail(email))
      throw new ValidationError("invalid email format!");
    return await prisma.user.findUnique({
      where: { email },
      include: { refreshToken: { select: { token: true, expiredAt: true } } },
    });
  }

  // register
  static async register(data: UserInput) {
    // validation
    if (!ValidationUtils.isValidEmail(data.email))
      throw new ValidationError("email format is not valid!");
    ValidationUtils.validationPassword(data.password);

    await UserService.existingEmail(data.email);
    const createUserData = await UserService.createUser(data);

    return createUserData;
  }

  // login
  static async login(email: string, password: string) {
    // validation
    if (!ValidationUtils.isValidEmail(email))
      throw new ValidationError("email format is not valid!");

    const getUserData = await this.getUserByEmailIncludeRefreshToken(email);
    if (!getUserData) throw new NotFoundError("email is not exist");

    const match = await argon2.verify(getUserData.password, password);
    if (!match) throw new UnauthorizedError("wrong password");

    // exclude password and refreshToken in getUserData
    const { password: _, refreshToken: __, ...data } = getUserData;
    return data;
  }

  // logout
  static async logout(refreshToken: string, device: string) {
    if (!refreshToken) throw new ValidationError("refresh token is required!");
    return this.updateRefreshToken(refreshToken, device, { is_revoked: true });
  }

  // me
  static async me(id: string) {
    // validation
    if (!id) throw new ValidationError("id is required!");

    const getUserData = await UserService.getUserByIdExcludePassword(id);
    if (!getUserData) throw new NotFoundError("user not found!");

    return getUserData;
  }
}
