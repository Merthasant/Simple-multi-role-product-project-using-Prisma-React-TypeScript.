import { type Request, type Response } from "express";
import UserService from "./user.service.js";
import {
  CreateUserBodyType,
  OptionParams,
  UpdateUserBodyType,
  UserUpdate,
} from "../../types/user.type.js";
import ResponseUtils from "../../lib/utils/response.utils.js";
import ValidationUtils from "../../lib/utils/validation.utils.js";
import {
  ConflictError,
  ValidationError,
  catchAllError,
} from "../../lib/utils/error.utils.js";

export default class UserController {
  // get one user
  static async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getUser = await UserService.getUserByIdExcludePassword(
        id.toString(),
      );
      if (!getUser)
        return ResponseUtils.errorClientResponse(404, res, "user not found");
      return ResponseUtils.successResponse(
        200,
        res,
        "user found successfully",
        getUser,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // get all users
  static async getAllUsers(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    try {
      const getUsers = await UserService.getAllUser({ page, limit, search });
      return ResponseUtils.successResponse(
        200,
        res,
        "users found succesfully",
        getUsers,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // create user
  static async createUser(req: Request, res: Response) {
    const { name, email, password, confPassword, role }: CreateUserBodyType =
      req.body;
    try {
      if (!name || !email || !password || !confPassword || !role)
        return ResponseUtils.errorClientResponse(
          400,
          res,
          "data must be complete",
        );
      if (!ValidationUtils.isValidEmail(email))
        return ResponseUtils.errorClientResponse(
          400,
          res,
          "incorrect email format",
        );
      if (password !== confPassword)
        return ResponseUtils.errorClientResponse(
          400,
          res,
          "password not match",
        );
      const createUserData = await UserService.createUser({
        name,
        email,
        password,
        role,
      });
      return ResponseUtils.successResponse(
        201,
        res,
        "user created successfully",
        createUserData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // update user
  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, confPassword, role }: UpdateUserBodyType =
      req.body;
    try {
      if (!name && !email && !password && !confPassword && !role)
        return ResponseUtils.errorClientResponse(
          400,
          res,
          "least one data must be required!",
        );
      // email validation if email is not undefined
      if (email)
        if (!ValidationUtils.isValidEmail(email.toString()))
          return ResponseUtils.errorClientResponse(
            400,
            res,
            "invalid email format!",
          );

      const getUser = await UserService.getUserById(id.toString());
      if (!getUser)
        return ResponseUtils.errorClientResponse(404, res, "user not found!");
      if (password) {
        if (password !== confPassword)
          return ResponseUtils.errorClientResponse(
            400,
            res,
            "password not match",
          );
      }

      const updateUserData = await UserService.updateUserById(id.toString(), {
        name,
        email,
        password,
        role,
      });
      return ResponseUtils.successResponse(
        200,
        res,
        "user updated successfully",
        updateUserData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }

  // delete user
  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getUser = await UserService.getUserById(id.toString());
      if (!getUser)
        return ResponseUtils.errorClientResponse(404, res, "user not found!");
      const deleteUserData = await UserService.deleteUserById(id.toString());
      return ResponseUtils.successResponse(
        200,
        res,
        "user deleted successfully",
        deleteUserData,
      );
    } catch (err) {
      return catchAllError(res, err);
    }
  }
}
