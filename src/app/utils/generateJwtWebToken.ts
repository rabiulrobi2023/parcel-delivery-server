import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";

export const generateJwtWebToken = (
  payload: Partial<IUser>,
  jwtSecret: string,
  jwtExpire: string
) => {
  const jwtPayload = {
    id: payload._id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };

  const token = jwt.sign(jwtPayload, jwtSecret, {
    expiresIn: jwtExpire,
  } as SignOptions);
  return token;
};
