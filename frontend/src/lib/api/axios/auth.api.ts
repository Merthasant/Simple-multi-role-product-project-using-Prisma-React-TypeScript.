import type { RegisterDataType } from "../../types/auth.type";
import type { ResponseType } from "../../types/response.type";
import type { UserOutput } from "../../types/user.type";
import axiosInstance from "./axios";

export const login = async (
  email: string,
  password: string,
): Promise<ResponseType<UserOutput>> => {
  const response = await axiosInstance.post<ResponseType<UserOutput>>(
    "/auth/login",
    {
      email,
      password,
    },
  );

  return response.data;
};

export const register = async (
  data: RegisterDataType,
): Promise<ResponseType<UserOutput>> => {
  const response = await axiosInstance.post<ResponseType<UserOutput>>(
    "/auth/register",
    data,
  );

  return response.data;
};

export const logout = async (): Promise<ResponseType<undefined>> => {
  const response =
    await axiosInstance.delete<ResponseType<undefined>>("/auth/logout");

  return response.data;
};

export const me = async (): Promise<ResponseType<UserOutput>> => {
  const response =
    await axiosInstance.get<ResponseType<UserOutput>>("/auth/me");

  return response.data;
};
