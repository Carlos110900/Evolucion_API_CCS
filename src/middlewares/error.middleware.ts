import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app.error.js";

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
};