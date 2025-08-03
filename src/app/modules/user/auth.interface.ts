import { Types } from "mongoose";
import { Role } from "./user.interface";

export interface IJwtPayload {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
}
