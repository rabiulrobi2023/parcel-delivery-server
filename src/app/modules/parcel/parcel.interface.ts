import { Types } from "mongoose";
export enum Type {
  document = "document",
  others = "others",
}

export enum Status {
  requested = "requested",
  cancelled = "cancelled",
  blocked = "blocked",
  approved = "approved",
  dispatched = "dispatched",
  in_transit = "in_transit",
  delivered = "delivered",
}

export interface ITrakingEvent {
  status: Status;
  location: string;
  note: string;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}

export interface IParcel {
  transactionId: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  weight: number;
  type: Type;
  fee: number;
  status: Status;
  deliveryAddress: string;
  statusLogs: [ITrakingEvent];
}
