/* eslint-disable @typescript-eslint/no-unused-vars */

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);
  sendResponse(res, {
    message: "User created sucessully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res, next) => {
  const user = req.user;
  const data = req.body;
  const result = await UserService.createAdmin(user, data);
  sendResponse(res, {
    message: "Admin created sucessully",
    data: result,
  });
});

const getAllusers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    message: "User retrived successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const result = await UserService.getSingleUser(userId);
  sendResponse(res, {
    message: "User retrived successfully",
    data: result,
  });
});

const blockUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const result = await UserService.blockUser(userId);
  sendResponse(res, {
    message: "User blocked successfully",
    data: result,
  });
});

const unblockUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const result = await UserService.unblockUser(userId);
  sendResponse(res, {
    message: "User unblocked successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const result = await UserService.deleteUser(userId);
  sendResponse(res, {
    message: "User deleted successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await UserService.getMe(userId);
  sendResponse(res, {
    message: "Get me succussfully",
    data: result,
  });
});

export const UserContrlller = {
  createUser,
  getAllusers,
  createAdmin,
  getSingleUser,
  blockUser,
  unblockUser,
  deleteUser,
  getMe,
};
