/* eslint-disable @typescript-eslint/no-explicit-any */
import httpstatus from "http-status-codes";
import AppError from "../errors/AppError";
import { Role, Status } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import { verifyJwtToken } from "../utils/verifyJwtToken";
import { envVariable } from "../config/envConfig";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";

const checkAuth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req) => {
    const accessToken = req.cookies.accessToken as string;
    if (!accessToken) {
      throw new AppError(httpstatus.UNAUTHORIZED, "No access token found");
    }

    let tokenData;
    try {
      tokenData = verifyJwtToken(
        accessToken,
        envVariable.JWT_ACCESS_SECRET
      ) as JwtPayload;
    } catch (err: any) {
      throw new AppError(httpstatus.UNAUTHORIZED, err);
    }

    const { role, email } = tokenData;

    if (requiredRoles.length > 0 && requiredRoles.includes(role)) {
      throw new AppError(
        httpstatus.UNAUTHORIZED,
        "You are not authorized person"
      );
    }

    const isUserExists = await User.findOne({ email: email });
    if (!isUserExists) {
      throw new AppError(
        httpstatus.NOT_FOUND,
        "The user of this token is not found"
      );
    }

    if (isUserExists.isDeleted) {
      throw new AppError(
        httpstatus.UNAUTHORIZED,
        "The user of this token is deleted"
      );
    }

    if (isUserExists.status === Status.blocked) {
      throw new AppError(
        httpstatus.UNAUTHORIZED,
        "The user of this token is blocked"
      );
    }

    req.user = tokenData;
  });
};

export default checkAuth;
