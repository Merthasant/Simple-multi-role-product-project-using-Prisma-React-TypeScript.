import { Response } from "express";
import ResponseUtils from "./response.utils";
import { ErrorClientStatus } from "../../types/status.type";

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalServerError";
  }
}

export const catchAllError = (res: Response, err: any) => {
  const clientError: [new (...args: any[]) => Error, ErrorClientStatus][] = [
    [ConflictError, 409],
    [ValidationError, 422],
    [NotFoundError, 404],
    [UnauthorizedError, 401],
    [ForbiddenError, 403],
    [BadRequestError, 400],
  ];

  // if (err instanceof ConflictError)
  //   return ResponseUtils.errorClientResponse(409, res, err);
  // if (err instanceof ValidationError)
  //   return ResponseUtils.errorClientResponse(422, res, err);
  // if (err instanceof NotFoundError)
  //   return ResponseUtils.errorClientResponse(404, res, err);
  // if (err instanceof UnauthorizedError)
  //   return ResponseUtils.errorClientResponse(401, res, err);
  // if (err instanceof ForbiddenError)
  //   return ResponseUtils.errorClientResponse(403, res, err);
  // if (err instanceof BadRequestError)
  //   return ResponseUtils.errorClientResponse(400, res, err);
  // or simplefied like this -->
  for (const [ErrorClass, status] of clientError) {
    if (err instanceof ErrorClass)
      return ResponseUtils.errorClientResponse(status, res, err.message);
  }

  if (err instanceof InternalServerError)
    return ResponseUtils.errorServerResponse(500, res, err.message);
  return ResponseUtils.errorServerResponse(500, res, err.message);
};
