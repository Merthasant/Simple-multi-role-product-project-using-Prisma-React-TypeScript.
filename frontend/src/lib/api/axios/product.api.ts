import type { OptionParams } from "../../types/option.type";
import type {
  ProductInput,
  ProductOutput,
  ProductUpdateInput,
} from "../../types/product.type";
import type { AddMetaData, ResponseType } from "../../types/response.type";
import axiosInstance from "./axios";

// C
export const createProduct = async (data: ProductInput) => {
  const response = await axiosInstance.post<ResponseType<undefined>>(
    "/products",
    data,
  );
  return response.data;
};

// R
export const getAllProducts = async (options: OptionParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    sortOrder = "asc",
  } = options;
  const response = await axiosInstance.get<
    ResponseType<AddMetaData<ProductOutput[]>>
  >("/products", {
    params: { page, limit, search, sortBy, sortOrder },
  });
  return response.data;
};

// U
export const updateProduct = async (id: string, data: ProductUpdateInput) => {
  const response = await axiosInstance.patch<ResponseType<undefined>>(
    `/products/${id}`,
    data,
  );
  return response.data;
};

// D
export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete<ResponseType<undefined>>(
    `/products/${id}`,
  );
  return response.data;
};
