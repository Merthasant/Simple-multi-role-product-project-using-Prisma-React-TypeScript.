import express from "express";
import AuthMiddleware from "../../middlewares/auth.middleware";
import ProductController from "./product.controller";

const router = express.Router();

router.get("/:id", AuthMiddleware.verifyUser, ProductController.getOneProduct);
router.get("/", AuthMiddleware.verifyUser, ProductController.getAllProducts);
router.get(
  "/user-products",
  AuthMiddleware.verifyUser,
  ProductController.getAllProductsByUserId,
);
router.post("/", AuthMiddleware.verifyUser, ProductController.createProduct);
router.put("/:id", AuthMiddleware.verifyUser, ProductController.updateProduct);
router.delete(
  "/:id",
  AuthMiddleware.verifyUser,
  ProductController.deleteProduct,
);
router.delete(
  "/",
  AuthMiddleware.verifyUser,
  ProductController.deleteAllProductsByUserId,
);

export default router;
