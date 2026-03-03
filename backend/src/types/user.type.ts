import { Prisma } from "../generated/prisma/browser.js";

export type UserUpdate = Prisma.userUpdateInput;
export type UserInput = Prisma.userCreateInput;
export interface CreateUserBodyType extends Prisma.userCreateInput {
  confPassword?: string;
}
export interface UpdateUserBodyType extends Prisma.userUpdateInput {
  confPassword?: string;
}
