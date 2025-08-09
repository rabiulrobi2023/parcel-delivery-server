import httpstatus from "http-status-codes";
import AppError from "../../errors/AppError";
import { IUser, Role, Status } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const isUserExists = await User.findOne({ email: payload.email });
  if (payload.role === Role.admin) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "Only super admin can create admin"
    );
  }
  if (payload.role === Role.superAdmin) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "You can not create super admin"
    );
  }
  if (isUserExists) {
    throw new AppError(httpstatus.CONFLICT, "User already exist");
  }
  const result = await User.create(payload);
  return result;
};

const createAdmin = async (user: JwtPayload, payload: IUser) => {
  if (user.role != Role.superAdmin) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "You are not authorized person to create an admin"
    );
  }

  if (payload.role != Role.admin) {
    throw new AppError(httpstatus.BAD_REQUEST, "You can create only admin");
  }

  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists) {
    throw new AppError(httpstatus.CONFLICT, "User already exist");
  }
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  return result;
};

const blockUser = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  if (isUserExists.status === Status.blocked) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is already blocked");
  }

  if (isUserExists.isDeleted) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is deleted");
  }
  const result = await User.findByIdAndUpdate(
    userId,
    {
      status: Status.blocked,
    },
    { new: true }
  );
  return result;
};

const unblockUser = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  if (isUserExists.status === Status.active) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is recently active");
  }

  if (isUserExists.isDeleted) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is deleted");
  }
  const result = await User.findByIdAndUpdate(
    userId,
    {
      status: Status.active,
    },
    { new: true }
  );
  return result;
};

const deleteUser = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }
  if (isUserExists.status === Status.blocked) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is blocked");
  }

  if (isUserExists.isDeleted) {
    throw new AppError(httpstatus.BAD_REQUEST, "User is already deleted");
  }
  const result = await User.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

const getMe = async (userId: string) => {
  const result = await User.findById(userId);
  if (!result) {
    throw new AppError(httpstatus.NOT_FOUND, "User not found");
  }

  return result;
};

export const UserService = {
  createUser,
  createAdmin,
  getAllUsers,
  getSingleUser,
  blockUser,
  unblockUser,
  deleteUser,
  getMe,
};
