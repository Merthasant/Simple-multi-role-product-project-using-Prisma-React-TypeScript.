import { catchAllError } from "../../lib/utils/error.utils";
import ResponseUtils from "../../lib/utils/response.utils";
import { AuthRequest } from "../../types/auth.type";
import { Response } from "express";
import OrderService from "./order.service";
import { OptionParams } from "../../types/option.type";
import {
  CreateOrderType,
  UpdateOrderUncheckedType,
} from "../../types/order.type";

export default class OrderController {
  // get one order
  static async getOneOrder(req: AuthRequest, res: Response) {
    const id = req.params.id;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "order id is empty!");
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized!");
    try {
      const orderData = await OrderService.getOneOrderById(
        id.toString(),
        userId,
      );
      if (!orderData)
        return ResponseUtils.errorClientResponse(404, res, "order not found!");
      return ResponseUtils.successResponse(
        200,
        res,
        "order found successfully",
        orderData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // get all orders
  static async getAllOrders(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    const role = req.user?.role;
    if (!userId || !role)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized!");
    console.log("role", role);
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "asc",
    }: OptionParams = req.query;
    try {
      const ordersData = await OrderService.getAllOrders(
        { page, limit, search, sortBy, sortOrder },
        role === "admin" ? undefined : userId,
      );
      return ResponseUtils.successResponse(
        200,
        res,
        "orders found successfully!",
        ordersData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // create order
  static async createOrder(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized");
    const { quantity, total, products }: CreateOrderType = req.body;
    if (!quantity || !total || !products)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "all data is required!",
      );
    try {
      const createOrder = await OrderService.createOrder({
        quantity,
        total,
        products,
        user: { connect: { id: userId } },
      });
      return ResponseUtils.successResponse(
        201,
        res,
        "order created successfully",
        createOrder,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // update order
  static async updateOrder(req: AuthRequest, res: Response) {
    const id = req.params.id;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "order id is empty!");
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized!");
    const { quantity, total }: UpdateOrderUncheckedType = req.body;
    if (!quantity && !total)
      return ResponseUtils.errorClientResponse(
        400,
        res,
        "quantity or total is required!",
      );
    try {
      const updatedOrder = await OrderService.updateOrderById(
        id.toString(),
        userId,
        { quantity, total },
      );
      return ResponseUtils.successResponse(
        200,
        res,
        "order updated successfully",
        updatedOrder,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // delete order
  static async deleteOrder(req: AuthRequest, res: Response) {
    const id = req.params.id;
    if (!id)
      return ResponseUtils.errorClientResponse(400, res, "order id is empty!");
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized!");
    try {
      const deletedOrder = await OrderService.deleteOrderById(
        id.toString(),
        userId,
      );
      return ResponseUtils.successResponse(
        200,
        res,
        "order deleted successfully",
        deletedOrder,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // delete bulk order
  static async deleteBulkOrder(req: AuthRequest, res: Response) {
    const userId = req.user?.userId;
    if (!userId)
      return ResponseUtils.errorClientResponse(403, res, "unauthorized!");
    try {
      const deletedOrders = await OrderService.deleteBulkOrder(userId);
      return ResponseUtils.successResponse(
        200,
        res,
        "orders deleted successfully",
        deletedOrders,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }
}
