import { ZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validationRequest = (zodSchema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
