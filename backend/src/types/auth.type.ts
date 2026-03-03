import { Request } from "express";

export interface AuthRequest extends Request {
  user?: AccessTokenType;
}

export type AccessTokenType = { userId?: string; role?: "user" | "admin" };
export type RefreshTokenType = {
  userId?: string;
  email?: string;
  role?: "user" | "admin";
};
