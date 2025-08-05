import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setCookie } from "../../utils/setCookie";
import { ITokenName } from "./auth.interface";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(async (req, res) => {
  const loginInfo = await AuthService.credentialLogin(req.body);
  setCookie(res, ITokenName.accessToken, loginInfo.accessToken);
  setCookie(res, ITokenName.refreshToken, loginInfo.refreshToken);
  sendResponse(res, {
    message: "User login successfully",
    data: loginInfo,
  });
});
export const AuthContrller = {
  credentialLogin,
};
