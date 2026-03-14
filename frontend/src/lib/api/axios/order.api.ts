import type { OptionParams } from "../../types/option.type";
import type {
  OrderInput,
  OrderOutput,
  OrderUpdateInput,
} from "../../types/order.type";

import type { AddMetaData, ResponseType } from "../../types/response.type";
import axiosInstance from "./axios";

// C
export const createOrder = async (data: OrderInput) => {
  const response = await axiosInstance.post<ResponseType<undefined>>(
    "/orders",
    data,
  );
  return response.data;
};

// R
export const getAllOrders = async (options: OptionParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "asc",
  } = options;
  const response = await axiosInstance.get<
    ResponseType<AddMetaData<OrderOutput[]>>
  >("/orders", {
    params: { page, limit, search, sortBy, sortOrder },
  });
  return response.data;
};

// U
export const updateOrder = async (id: string, data: OrderUpdateInput) => {
  const response = await axiosInstance.patch<ResponseType<undefined>>(
    `/orders/${id}`,
    data,
  );
  return response.data;
};

// D
export const deleteOrder = async (id: string) => {
  const response = await axiosInstance.delete<ResponseType<undefined>>(
    `/orders/${id}`,
  );
  return response.data;
};
