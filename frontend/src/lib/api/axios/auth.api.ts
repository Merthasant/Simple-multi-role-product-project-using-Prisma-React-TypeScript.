import type {
  AuthOutputDataType,
  RegisterInputDataType,
  LoginInputDataType,
} from "../../types/auth.type";
import type { ResponseType } from "../../types/response.type";
import type { UserOutput } from "../../types/user.type";
import axiosInstance from "./axios";

export const login = async (
  data: LoginInputDataType,
): Promise<ResponseType<AuthOutputDataType>> => {
  const response = await axiosInstance.post<ResponseType<AuthOutputDataType>>(
    "/auth/login",
    data,
  );
  const token = response.data.payload?.token.accessToken;
  if (!token) throw new Error("token is required");
  localStorage.setItem("token", token);
  return response.data;
};

export const register = async (
  data: RegisterInputDataType,
): Promise<ResponseType<AuthOutputDataType>> => {
  const response = await axiosInstance.post<ResponseType<AuthOutputDataType>>(
    "/auth/register",
    data,
  );
  const token = response.data.payload?.token.accessToken;
  if (!token) throw new Error("token is required");
  localStorage.setItem("token", token);
  return response.data;
};

export const logout = async (): Promise<ResponseType<undefined>> => {
  const response =
    await axiosInstance.post<ResponseType<undefined>>("/auth/logout");
  localStorage.removeItem("token");
  return response.data;
};

export const me = async (): Promise<ResponseType<UserOutput>> => {
  const response =
    await axiosInstance.get<ResponseType<UserOutput>>("/auth/me");

  return response.data;
};
