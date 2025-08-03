/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

type TCatchAsync = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: TCatchAsync) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(
      fn(req, res, next).catch((err: any) => {
        next(err);
      })
    );
