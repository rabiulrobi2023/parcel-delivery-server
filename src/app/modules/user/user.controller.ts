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

export const UserContrlller = {
    createUser
}
