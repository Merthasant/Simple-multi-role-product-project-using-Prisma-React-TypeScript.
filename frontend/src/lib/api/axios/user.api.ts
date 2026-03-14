import type { OptionParams } from "../../types/option.type";
import type { AddMetaData, ResponseType } from "../../types/response.type";
import type {
  UserInput,
  UserOutput,
  UserUpdateInput,
} from "../../types/user.type";
import axiosInstance from "./axios";

// C
export const createUser = async (data: UserInput) => {
  const response = await axiosInstance.post<ResponseType<undefined>>(
    "/users",
    data,
  );
  return response.data;
};

// R
export const getAllUsers = async (options: OptionParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "asc",
  } = options;

  const response = await axiosInstance.get<
    ResponseType<AddMetaData<UserOutput[]>>
  >("/users", { params: { page, limit, search, sortBy, sortOrder } });
  return response.data;
};

// U

export const updateUser = async (id: string, data: UserUpdateInput) => {
  const response = await axiosInstance.patch<ResponseType<undefined>>(
    `/users/${id}`,
    data,
  );
  return response.data;
};

// D
export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete<ResponseType<undefined>>(
    `/users/${id}`,
  );
  return response.data;
};
