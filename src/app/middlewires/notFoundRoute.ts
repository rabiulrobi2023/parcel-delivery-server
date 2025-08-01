import { Request, Response } from "express";
import httpstatus from "http-status-codes";

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(httpstatus.NOT_FOUND).json({
    success: false,
    message: "Route not found",
  });
};
