import { Response } from "express";
import {
  ErrorClientStatus,
  ErrorServerStatus,
  SuccessStatus,
} from "../../types/status.type";

export default class ResponseUtils {
  // Helper function to get error message based on environment
  private static getErrorMessage(message: any): any {
    const isDev = process.env.NODE_ENV !== "production";

    if (isDev) {
      return message;
    }

    // In production, return generic message for error details
    if (typeof message === "string") {
      return "An error occurred";
    }
    return message;
  }

  static errorServerResponse(
    status: ErrorServerStatus,
    res: Response,
    message: any,
  ) {
    const errorMessage = this.getErrorMessage(message);
    res.status(status).json({ status: "server error", message: errorMessage });
  }

  static successResponse(
    status: SuccessStatus,
    res: Response,
    message: any,
    data: any,
  ) {
    res.status(status).json({ status: "success", message, payload: data });
  }

  static errorClientResponse(
    status: ErrorClientStatus,
    res: Response,
    message: any,
  ) {
    const errorMessage = this.getErrorMessage(message);
    res.status(status).json({ status: "client error", message: errorMessage });
  }
}
