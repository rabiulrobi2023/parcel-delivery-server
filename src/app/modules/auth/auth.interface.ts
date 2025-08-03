import { Types } from "mongoose";
import { Role } from "../user/user.interface";

export interface ILogin {
  email: string;
  password: string;
}

export interface IJwtPayload {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
}
