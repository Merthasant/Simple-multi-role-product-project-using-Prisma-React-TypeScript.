import express from "express";
import userRoute from "../modules/user/user.route.js";
import authRoute from "../modules/auth/auth.route.js";
import productRoute from "../modules/product/product.route.js";
import orderRoute from "../modules/order/order.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);

export default router;
