import express from "express";
import UserController from "./user.controller.js";
import AuthMiddleware from "../../middlewares/auth.middleware.js";
import AccessMiddleware from "../../middlewares/access.middleware.js";

const router = express.Router();

router.get(
  "/:id",
  AuthMiddleware.verifyUser,
  AccessMiddleware.adminOnly,
  UserController.getOneUser,
);
router.get(
  "/",
  AuthMiddleware.verifyUser,
  AccessMiddleware.adminOnly,
  UserController.getAllUsers,
);
router.post(
  "/",
  AuthMiddleware.verifyUser,
  AccessMiddleware.adminOnly,
  UserController.createUser,
);
router.patch(
  "/:id",
  AuthMiddleware.verifyUser,
  AccessMiddleware.adminOnly,
  UserController.updateUser,
);
router.delete(
  "/:id",
  AuthMiddleware.verifyUser,
  AccessMiddleware.adminOnly,
  UserController.deleteUser,
);

export default router;
