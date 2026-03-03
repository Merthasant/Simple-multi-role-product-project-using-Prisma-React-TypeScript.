import argon2 from "argon2";
import { prisma } from "../../lib/prisma.js";
import { UserInput, UserUpdate } from "../../types/user.type.js";
import { OptionParams } from "../../types/option.type.js";
import ValidationUtils from "../../lib/utils/validation.utils.js";
import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from "../../lib/utils/error.utils.js";

export default class UserService {
  // reusable select
  private static readonly userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  };

  // id must be required
  private static idRequired(id: string) {
    if (!id) throw new ValidationError("id is required!");
  }

  // existing email
  static async existingEmail(email: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }
  }

  // get user by email
  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  // get user by email exclude password
  static async getUserByEmailExcludePassword(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    });
  }

  // get user by id
  static async getUserById(id: string) {
    this.idRequired(id);
    return await prisma.user.findUnique({ where: { id } });
  }

  // get user by id exclude password
  static async getUserByIdExcludePassword(id: string) {
    this.idRequired(id);
    return await prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  // get all user
  static async getAllUser(options?: OptionParams) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    // skip data for pages
    const skip = (page - 1) * limit;

    const where: any = {};

    if (options?.search)
      where.OR = [
        { name: { contains: options.search, mode: "insensitive" } },
        { email: { contains: options.search, mode: "insensitive" } },
      ];

    // get total and data user
    const [getUsers, getTotal] = await Promise.all([
      prisma.user.findMany({
        where,
        select: this.userSelect,
        skip,
        take: limit,
        orderBy: {
          // order 2 parameter
          [options?.sortBy || "createdAt"]: options?.sortOrder || "asc",
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: getUsers,
      meta: {
        page,
        limit,
        total: getTotal,
        totalPages: Math.ceil(getTotal / limit),
      },
    };
  }

  // create user
  static async createUser(data: UserInput) {
    // validation
    await this.existingEmail(data.email);
    ValidationUtils.validationPassword(data.password);

    const hashedPassword = await argon2.hash(data.password);
    return await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: this.userSelect,
    });
  }

  // update user by id
  static async updateUserById(id: string, data: UserUpdate) {
    this.idRequired(id);
    const existUser = await this.getUserById(id);
    if (!existUser) throw new NotFoundError("user not exist");
    const container: UserUpdate = {
      name: data.name || existUser.name,
      email: data.email || existUser.email,
      role: data.role || existUser.role,
    };
    // if new password exist
    if (data.password && data.password.toString().trim() !== "") {
      ValidationUtils.validationPassword(data.password.toString());
      container.password = await argon2.hash(data.password.toString());
    }

    return await prisma.user.update({
      where: { id },
      data: container,
      select: this.userSelect,
    });
  }

  // delete user by id
  static async deleteUserById(id: string) {
    this.idRequired(id);
    return await prisma.user.delete({ where: { id }, select: this.userSelect });
  }
}
