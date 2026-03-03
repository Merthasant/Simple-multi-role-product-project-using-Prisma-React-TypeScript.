import { type Response } from "express";
import ProductService from "./product.service.js";
import {
  ProductCreateType,
  ProductUncheckedCreateType,
  ProductUpdateType,
} from "../../types/product.type.js";
import ResponseUtils from "../../lib/utils/response.utils.js";
import { catchAllError } from "../../lib/utils/error.utils.js";
import { AuthRequest } from "../../types/auth.type.js";

export default class ProductController {
  // get one product
  static async getOneProduct(req: AuthRequest, res: Response) {
    const { id } = req.params;
    // try to get userId from authenticated user if available
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");
    try {
      const product = await ProductService.getOneProductById(id.toString());
      if (!product)
        return ResponseUtils.errorClientResponse(404, res, "product not found");
      return ResponseUtils.successResponse(200, res, "product found", product);
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // get all products
  static async getAllProducts(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";
    try {
      const products = await ProductService.getAllProducts({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });
      return ResponseUtils.successResponse(
        200,
        res,
        "products found",
        products,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // get all product by user id
  static async getAllProductsByUserId(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";
    try {
      const products = await ProductService.getAllProductsByUserId(userId, {
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });
      return ResponseUtils.successResponse(
        200,
        res,
        "products found",
        products,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // create product
  static async createProduct(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");

    const { name, description, orders, price }: ProductUncheckedCreateType =
      req.body;
    if (!name || !description || !orders || !price)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "all fields are required",
      );

    try {
      const created = await ProductService.createProduct({
        name,
        description,
        orders,
        price,
        userId,
      });
      return ResponseUtils.successResponse(
        201,
        res,
        "product created",
        created,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // update product
  static async updateProduct(req: AuthRequest, res: Response) {
    const { id } = req.params;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "id is required");

    const userId = req.user?.userId;
    const role = req.user?.role;
    if (!role || !userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");

    const { name, description, orders, price }: ProductUpdateType = req.body;
    if (!name && !description && !orders && !price)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "all fields are empty, at least one field is required",
      );

    try {
      const existingProduct = await ProductService.getOneProductById(
        id.toString(),
      );

      if (!existingProduct)
        return ResponseUtils.errorClientResponse(404, res, "product not found");

      if (!ProductService.isUserProduct(existingProduct.userId, userId, role))
        return ResponseUtils.errorClientResponse(403, res, "forbidden");

      const updated = await ProductService.updateProductById(
        id.toString(),
        userId,
        { name, description, orders, price },
      );
      return ResponseUtils.successResponse(
        200,
        res,
        "product updated",
        updated,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // delete product
  static async deleteProduct(req: AuthRequest, res: Response) {
    const { id } = req.params;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "id is required");

    const userId = req.user?.userId;
    const role = req.user?.role;
    if (!role || !userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");

    try {
      const existingProduct = await ProductService.getOneProductById(
        id.toString(),
      );
      if (!existingProduct)
        return ResponseUtils.errorClientResponse(404, res, "product not found");

      if (!ProductService.isUserProduct(existingProduct.userId, userId, role))
        return ResponseUtils.errorClientResponse(403, res, "forbidden");
      const deleted = await ProductService.deleteProductById(
        id.toString(),
        userId,
      );
      return ResponseUtils.successResponse(
        200,
        res,
        "product deleted",
        deleted,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // delete all products for authenticated user
  static async deleteAllProductsByUserId(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(401, res, "unauthorized");
    try {
      const result = await ProductService.deleteAllProductsByUserId(userId);
      return ResponseUtils.successResponse(
        200,
        res,
        "all products deleted",
        result,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }
}
