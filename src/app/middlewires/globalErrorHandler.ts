import httpstatus from "http-status-codes";
import { ErrorRequestHandler } from "express";
import { envVariable } from "../config/envConfig";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSource = [
    {
      path: "",
      message: "",
    },
  ];

  if (err.code === 1100) {
    statusCode = httpstatus.CONFLICT;
    message = `${Object.values(err.keyValue)[0]} is duplicate`;
  } else if (err.name === "ValidationError") {
    statusCode = httpstatus.BAD_REQUEST;
    message = err?.message;
    const errors = Object.values(err.errors);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach((err: any) =>
      errorSource.push({ path: err?.path, message: err?.message })
    );
  } else if (err.name === "CastError") {
    statusCode = httpstatus.BAD_REQUEST;
    message = "Invalid mongodb Id";
  } else if (err.name === "ZodError") {
    statusCode = httpstatus.BAD_REQUEST;
    message = "Zod error";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err.issues.forEach((error: any) =>
      errorSource.push({
        path: error.path.join(" inside "),
        message: error.message,
      })
    );
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: envVariable.NODE_ENV === "development" ? err : "",
    stack: envVariable.NODE_ENV === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
