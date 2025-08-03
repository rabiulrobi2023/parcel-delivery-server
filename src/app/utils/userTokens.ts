import { envVariable } from "../config/envConfig";
import { IUser } from "../modules/user/user.interface";
import { generateJwtWebToken } from "./generateJwtWebToken";

export const generateUserTokens = (payload: Partial<IUser>) => {
  const accessToken = generateJwtWebToken(
    payload,
    envVariable.JWT_ACCESS_SECRET,
    envVariable.JWT_ACCESS_EXPIRE
  );

  const refreshToken = generateJwtWebToken(
    payload,
    envVariable.JWT_REFRESH_SECRET,
    envVariable.JWT_REFRESH_EXPIRE
  );

  return {
    accessToken,
    refreshToken,
  };
};
