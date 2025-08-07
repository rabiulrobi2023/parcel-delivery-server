import { model, Schema } from "mongoose";
import { IParcel, ITrakingEvent, Status, Type } from "./parcel.interface";

export const trakingEventSchema = new Schema<ITrakingEvent>(
  {
    status: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    updatedBy: {
      type: Schema.ObjectId,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const parcelSchema = new Schema<IParcel>(
  {
    transactionId: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    weight: {
      type: Number,
    },
    type: {
      type: String,
      enum: Object.values(Type),
    },
    fee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.requested,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },
    statusLogs: [trakingEventSchema],
  },
  { timestamps: true }
);

export const Parcel = model<IParcel>("parcel", parcelSchema);
