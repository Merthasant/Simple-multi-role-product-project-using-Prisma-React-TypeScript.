import { prisma } from "../../lib/prisma";
import { NotFoundError, ValidationError } from "../../lib/utils/error.utils";
import ValidationUtils from "../../lib/utils/validation.utils";
import { OptionParams } from "../../types/option.type";
import {
  ProductUncheckedCreateType,
  ProductUpdateType,
  ProductWhereInputType,
} from "../../types/product.type";

export default class ProductService {
  // allow sort by these fields only
  static allowSort(sortBy: string) {
    const allowedSortFields = ["name", "description", "price", "createdAt"];
    return allowedSortFields.includes(sortBy);
  }

  // get one product by id
  static async getOneProductById(id: string) {
    // validation
    if (!id) throw new ValidationError("id is required!");

    return prisma.product.findUnique({ where: { id } });
  }

  // get all products by user id
  static async getAllProductsByUserId(userId: string, option?: OptionParams) {
    // validation
    if (!userId) throw new ValidationError("user id is required!");
    const { page, limit, search, sortBy, sortOrder } =
      ValidationUtils.validationOptions(option);
    if (!ProductService.allowSort(sortBy)) {
      throw new ValidationError("Invalid sortBy value!");
    }

    const skip = (page - 1) * limit;

    let where: ProductWhereInputType = { userId };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [productsData, getTotal] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: productsData,
      meta: {
        total: getTotal,
        page,
        limit,
        totalPages: Math.ceil(getTotal / limit),
      },
    };
  }

  // get all proudcts
  static async getAllProducts(option?: OptionParams) {
    const { page, limit, search, sortBy, sortOrder } =
      ValidationUtils.validationOptions(option);
    if (!ProductService.allowSort(sortBy)) {
      throw new ValidationError("Invalid sortBy value!");
    }

    const skip = (page - 1) * limit;

    let where: ProductWhereInputType = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [productsData, getTotal] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: productsData,
      meta: {
        total: getTotal,
        page,
        limit,
        totalPages: Math.ceil(getTotal / limit),
      },
    };
  }

  // create product
  static async createProduct(data: ProductUncheckedCreateType) {
    return await prisma.product.create({
      data,
    });
  }

  // update product by id
  static async updateProductById(
    id: string,
    userId: string,
    data: ProductUpdateType,
  ) {
    // validation
    if (!id) throw new ValidationError("id is required!");
    if (!userId) throw new ValidationError("user id is required!");

    return await prisma.product.update({ where: { id, userId }, data });
  }

  // delete product by id
  static async deleteProductById(id: string, userId: string) {
    // validation
    if (!id) throw new ValidationError("id is required!");
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.product.delete({ where: { id, userId } });
  }

  // delete all products by user id
  static async deleteAllProductsByUserId(userId: string) {
    // validation
    if (!userId) throw new ValidationError("user id is required!");
    return await prisma.product.deleteMany({ where: { userId } });
  }

  // is user product
  static isUserProduct(
    producUserId: string,
    userId: string,
    role: "admin" | "user",
  ) {
    if (!producUserId || !userId || !role)
      throw new ValidationError(
        "Missing required parameters for is user product check",
      );
    if (role === "admin") return true;
    return producUserId === userId;
  }
}
