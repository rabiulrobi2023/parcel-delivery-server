import httpstatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (payload: Partial<IUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(httpstatus.CONFLICT, "User already exist");
  }
  const result = await User.create(payload);
  return result;
};

export const UserService = {
  createUser,
};
