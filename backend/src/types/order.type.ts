import {
  orderCreateInput,
  orderUncheckedCreateInput,
  orderUncheckedUpdateInput,
  orderUpdateInput,
  orderWhereInput,
} from "../generated/prisma/models";

export type CreateOrderType = orderCreateInput;
export type CreateOrderUncheckedType = orderUncheckedCreateInput;
export type UpdateOrderType = orderUpdateInput;
export type UpdateOrderUncheckedType = orderUncheckedUpdateInput;

export type OrderWhereType = orderWhereInput;
