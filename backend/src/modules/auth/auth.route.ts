import express from "express";
import AuthController from "./auth.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthMiddleware.verifyUser, AuthController.me);
router.post("/logout", AuthMiddleware.verifyUser, AuthController.logout);

export default router;
