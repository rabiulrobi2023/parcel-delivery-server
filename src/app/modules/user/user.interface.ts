import { Types } from "mongoose";

export enum Role {
  admin = "admin",
  sender = "sender",
  receiver = "receiver",
}

export enum Status {
  active = "active",
  blocked = "blocked",
}

export interface IUser {
  _id?: Types.ObjectId,
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  role: Role;
  status: Status;
  isDeleted: boolean;
}
