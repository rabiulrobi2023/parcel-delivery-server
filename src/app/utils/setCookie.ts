import { Response } from "express";
import { envVariable } from "../config/envConfig";

export const setCookie = (res: Response, cookieName: string, token: string) => {
  return res.cookie(cookieName, token, {
    httpOnly: true,
    secure: envVariable.NODE_ENV === "production",
    sameSite: "none",
  });
};
