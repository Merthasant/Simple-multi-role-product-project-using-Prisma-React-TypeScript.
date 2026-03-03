import { prisma } from "../../lib/prisma";
import { NotFoundError, ValidationError } from "../../lib/utils/error.utils";
import ValidationUtils from "../../lib/utils/validation.utils";
import { OptionParams } from "../../types/option.type";
import {
  CreateOrderType,
  OrderWhereType,
  UpdateOrderUncheckedType,
} from "../../types/order.type";

export default class OrderService {
  private static readonly allowedSortFields = [
    "createdAt",
    "updatedAt",
    "total",
    "quantity",
  ];

  // allow sort
  static allowSort(sortBy: string) {
    return this.allowedSortFields.includes(sortBy);
  }

  // get one order by id
  static async getOneOrderById(id: string, userId: string) {
    if (!id) throw new ValidationError("order id is required!");
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.order.findUnique({ where: { id, userId } });
  }

  // create order
  static async createOrder(data: CreateOrderType) {
    return await prisma.$transaction(async (tx) => {
      const productData = await tx.product.findUnique({
        where: { id: data.products.connect?.id },
      });
      const userData = await tx.user.findUnique({
        where: { id: data.user.connect?.id },
      });
      if (!productData || !userData)
        throw new NotFoundError(
          "product or userData not found in create order service!",
        );
      const getTotal = productData.price * data.quantity;
      if (getTotal !== data.total) throw new ValidationError("total not match");

      if (productData.quantity === 0) throw new ValidationError("out of stock");
      if (getTotal > productData.quantity)
        throw new ValidationError(
          `not enough stock, stock available ${productData.quantity}`,
        );

      const updateProduct = await tx.product.update({
        where: { id: productData.id },
        data: {
          quantity: {
            decrement: data.quantity,
          },
        },
      });
      const OrderDataCreated = await tx.order.create({ data });
      return { data: OrderDataCreated, remainingStock: updateProduct.quantity };
    });
  }

  // get all orders
  static async getAllOrders(options: OptionParams, userId?: string) {
    const { limit, page, search, sortBy, sortOrder } =
      ValidationUtils.validationOptions(options);
    if (!OrderService.allowSort(sortBy)) {
      throw new ValidationError(`Invalid sortBy field: ${sortBy}`);
    }
    console.log(userId);
    const skip = (page - 1) * limit;

    let where: OrderWhereType = userId ? { userId } : {};
    if (search) {
      where.OR = [
        { products: { name: { contains: search, mode: "insensitive" } } },
        {
          products: { description: { contains: search, mode: "insensitive" } },
        },
      ];
      if (!userId) {
        where.OR?.push(
          {
            user: { name: { contains: search, mode: "insensitive" } },
          },
          {
            products: {
              user: { name: { contains: search, mode: "insensitive" } },
            },
          },
        );
      }
    }

    const [getOrders, getTotal] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          products: {
            select: {
              name: true,
              price: true,
              createdAt: true,
              updatedAt: true,
              user: { select: { name: true, email: true } },
            },
          },
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      data: getOrders,
      meta: {
        page,
        limit,
        total: getTotal,
        totalPages: Math.ceil(getTotal / limit),
      },
    };
  }

  // update order
  static async updateOrderById(
    id: string,
    userId: string,
    data: UpdateOrderUncheckedType,
  ) {
    if (!id) throw new ValidationError("order id is required!");
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id, userId },
      });
      if (!existingOrder) throw new NotFoundError("order is not exist!");
      const container: UpdateOrderUncheckedType = {
        quantity: data.quantity ?? existingOrder.quantity,
        total: data.total ?? existingOrder.total,
      };
      return await tx.order.update({
        where: { id, userId },
        data: container,
      });
    });
  }

  // delete order
  static async deleteOrderById(id: string, userId: string) {
    if (!id) throw new ValidationError("order id is required!");
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: { id, userId },
      });
      if (!existingOrder) throw new NotFoundError("order is not exist!");
      return await tx.order.delete({ where: { id, userId } });
    });
  }

  // delete bulk order
  static async deleteBulkOrder(userId: string) {
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.order.deleteMany({ where: { userId } });
  }
}
