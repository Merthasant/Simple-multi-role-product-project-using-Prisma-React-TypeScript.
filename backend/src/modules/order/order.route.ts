import express from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import OrderController from "./order.controller";

const router = express.Router();

router.get("/:id", AuthMiddleware.verifyUser, OrderController.getOneOrder);
router.get("/", AuthMiddleware.verifyUser, OrderController.getAllOrders);
router.post("/", AuthMiddleware.verifyUser, OrderController.createOrder);
router.patch("/:id", AuthMiddleware.verifyUser, OrderController.updateOrder);
router.delete("/:id", AuthMiddleware.verifyUser, OrderController.deleteOrder);
router.delete("/", AuthMiddleware.verifyUser, OrderController.deleteBulkOrder);

export default router;
