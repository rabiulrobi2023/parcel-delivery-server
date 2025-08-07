import httpstatus from "http-status-codes";
import { Types } from "mongoose";
import { IParcel, ITrakingEvent, Status, Type } from "./parcel.interface";
import { generateTnxId } from "./parcel.utils";
import { Parcel } from "./parcel.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";

//==============================Create Parcel===================================
const createParcel = async (id: Types.ObjectId, payload: Partial<IParcel>) => {
  const isReveiverExists = await User.findById(payload.receiver);
  if (!isReveiverExists) {
    throw new AppError(httpstatus.ACCEPTED, "Receiver not found");
  }
  const tnxId = await generateTnxId();
  payload.transactionId = tnxId;

  payload.sender = id;

  if (payload.type === Type.document) {
    payload.fee = 30;
  } else {
    payload.fee = (payload.weight as number) * 30;
  }

  const trakingEvent = payload?.statusLogs?.[0] as Partial<ITrakingEvent>;

  trakingEvent.status = Status.requested;
  trakingEvent.updatedBy = id;

  const result = await Parcel.create({
    ...payload,
    statusLogs: [trakingEvent],
  });
  return result;
};

//==============================Get All Parcel===================================
const getAllParcel = async () => {
  const result = await Parcel.find();
  return result;
};

//==============================Cancel Parcel===================================
const cancelParcel = async (
  id: string,
  sender: Types.ObjectId,
  payload?: { note: string }
) => {
  const isParcelExists = await Parcel.findOne({ _id: id, sender: sender });

  if (!isParcelExists) {
    throw new AppError(httpstatus.NOT_FOUND, "Parcel not found");
  }
  const lastStatus =
    isParcelExists?.statusLogs[isParcelExists.statusLogs.length - 1].status;

  if (lastStatus === Status.cancelled) {
    throw new AppError(httpstatus.CONFLICT, "Parcel already cancelled");
  }
  if (isParcelExists.statusLogs.length > 1) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `Your can not cancel the parcel because the parcel already ${lastStatus}`
    );
  }

  const newTrack = {
    status: Status.cancelled,
    location: isParcelExists.statusLogs[0].location,
    note: payload?.note || "",
    updatedBy: sender,
    updatedAt: new Date(),
  };

  const newStatusLog = isParcelExists.statusLogs;
  newStatusLog.push(newTrack);

  const result = await Parcel.findByIdAndUpdate(
    id,
    { statusLogs: newStatusLog, status: Status.cancelled },
    { new: true }
  );
  return result;
};

//==============================Get My Sent Parcel===================================
const getMysentParcels = async (sender: string) => {
  const myParcel = await Parcel.find({ sender: sender });
  return myParcel;
};

export const ParcelService = {
  createParcel,
  getAllParcel,
  cancelParcel,
  getMysentParcels
};
