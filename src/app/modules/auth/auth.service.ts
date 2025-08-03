import { generateUserTokens } from "./../../utils/userTokens";
import httpstatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { Status } from "../user/user.interface";
import { checkPassword } from "../../utils/checkPassword";

const credentialLogin = async (payload: ILogin) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (!isUserExists) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  if (isUserExists.status === Status.blocked) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is blocked");
  }
  if (isUserExists.isDeleted) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is deleted");
  }

  if (!checkPassword(payload.password, isUserExists.password)) {
    throw new AppError(httpstatus.BAD_REQUEST, "Worng password");
  }
  const userTokens = generateUserTokens(isUserExists);
  return userTokens;
};

export const AuthService = {
  credentialLogin,
};
