import { OptionParams } from "../../types/option.type";
import { ValidationError } from "./error.utils";

export default class ValidationUtils {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validationPassword(password: string) {
    if (password.length <= 3)
      throw new ValidationError("password must be more than 6 character");
  }

  static passwordAndConfPasswordMatched(
    password: string,
    confPassword: string,
  ) {
    if (password !== confPassword)
      throw new ValidationError("password is not match!");
  }

  static validationOptions(option?: OptionParams) {
    const page = option?.page || 1;
    const limit = option?.limit || 10;
    const search = option?.search || "";
    const sortBy = option?.sortBy || "createdAt";
    const sortOrder = option?.sortOrder || "asc";
    return { page, limit, search, sortBy, sortOrder };
  }
}
