import httpstatus from "http-status-codes";
import { Types } from "mongoose";
import { IParcel, ITrakingEvent, Status, Type } from "./parcel.interface";
import { generateTnxId } from "./parcel.utils";
import { Parcel } from "./parcel.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";

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
const getAllParcel = async (query: Record<string, string>) => {
  const result = await Parcel.find(query)
    .populate("receiver")
    .populate("sender")
    .populate("statusLogs.updatedBy");
  return result;
};

//==============================Get Single Parcel===================================
const getSingleParcel = async (parcelId: string) => {
  const result = await Parcel.findById(parcelId)
    .populate("receiver")
    .populate("sender")
    .populate("statusLogs.updatedBy");
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
const getMySentParcels = async (sender: string) => {
  const myParcel = await Parcel.find({ sender: sender })
    .populate("receiver")
    .populate("sender")
    .populate("statusLogs.updatedBy");
  return myParcel;
};

//==============================Get My Incoming Parcel===================================
const getMyIncomingParcels = async (reveiverId: string) => {
  const result = await Parcel.find({
    receiver: reveiverId,
    status: { $nin: [Status.cancelled, Status.cancelled, Status.delivered] },
  })
    .populate("receiver")
    .populate("sender")
    .populate("statusLogs.updatedBy");
  return result;
};

//==============================Update Parcel Status by Admin===================================
const updateParcelStatus = async (
  parcelId: string,
  user: JwtPayload,
  updateData: Partial<ITrakingEvent>
) => {
  const isParcelExists = await Parcel.findById(parcelId);
  if (!isParcelExists) {
    throw new AppError(httpstatus.NOT_FOUND, "Parcel not found");
  }

  if (isParcelExists.status === Status.cancelled) {
    throw new AppError(httpstatus.BAD_REQUEST, "Parcel is already cancelled");
  }
  if (isParcelExists.status === Status.delivered) {
    throw new AppError(httpstatus.BAD_REQUEST, "Parcel is already delivered");
  }
  if (isParcelExists.status === Status.blocked) {
    throw new AppError(httpstatus.BAD_REQUEST, "Parcel is already blocked");
  }

  if (updateData.status === Status.delivered) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "Only reveiver can staus change as delivered"
    );
  }
  if (updateData.status === Status.cancelled) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      "Only sender can cancel the parcel"
    );
  }

  isParcelExists?.statusLogs.forEach((log) => {
    if (log.status === updateData.status) {
      throw new AppError(
        httpstatus.CONFLICT,
        `The Parcel is already ${isParcelExists.status}`
      );
    }
  });

  if (
    updateData.status === Status.dispatched &&
    isParcelExists.status != Status.approved
  ) {
    throw new AppError(httpstatus.BAD_REQUEST, "Parcel is not approved");
  }
  if (
    updateData.status === Status.in_transit &&
    isParcelExists.status != Status.dispatched
  ) {
    throw new AppError(httpstatus.BAD_REQUEST, "Parcel is not dispatched");
  }

  const newTrack: ITrakingEvent = {
    status: updateData.status as Status,
    location: updateData.location as string,
    note: updateData.note || "",
    updatedBy: user?.id,
    updatedAt: new Date(),
  };

  const newStatusLog = isParcelExists.statusLogs;
  newStatusLog.push(newTrack);

  const result = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      statusLogs: newStatusLog,
      status: updateData.status,
    },
    { new: true }
  );

  return result;
};

const makeConfirmDelivery = async (
  parcelId: string,
  userId: Types.ObjectId,
  updateData: ITrakingEvent
) => {
  const isParcelExists = await Parcel.findOne({
    receiver: userId,
    _id: parcelId,
  });
  if (!isParcelExists) {
    throw new AppError(httpstatus.NOT_FOUND, "Parcel not found");
  }
  if (
    isParcelExists.status === Status.blocked ||
    isParcelExists.status === Status.cancelled
  ) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `The parcel is ${isParcelExists.status}`
    );
  }
  if (isParcelExists.status != Status.in_transit) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `The parcel is in ${isParcelExists.status}`
    );
  }

  const newTrack: ITrakingEvent = {
    status: Status.delivered,
    location: updateData.location || "",
    note: updateData.note || "",
    updatedBy: userId,
    updatedAt: new Date(),
  };

  const newStatusLog = isParcelExists.statusLogs;
  newStatusLog.push(newTrack);
  const result = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      status: Status.delivered,
      statusLogs: newStatusLog,
    },
    { new: true }
  );

  return result;
};

const blockParcel = async (
  parcelId: string,
  userId: Types.ObjectId,
  updateData: Partial<ITrakingEvent>
) => {
  const isParcelExists = await Parcel.findById(parcelId);
  if (!isParcelExists) {
    throw new AppError(httpstatus.NOT_FOUND, "Parcel not found");
  }
  if (isParcelExists.status != Status.requested) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `The parcel is already ${isParcelExists.status}`
    );
  }

  const newTrack: ITrakingEvent = {
    status: Status.blocked,
    location: updateData.location || "",
    note: updateData.note || "",
    updatedBy: userId,
    updatedAt: new Date(),
  };

  const newStatusLog = isParcelExists.statusLogs;
  newStatusLog.push(newTrack);
  const result = await Parcel.findByIdAndUpdate(
    parcelId,
    {
      status: Status.blocked,
      statusLogs: newStatusLog,
    },
    { new: true }
  );

  return result;
};

export const ParcelService = {
  createParcel,
  getAllParcel,
  getSingleParcel,
  cancelParcel,
  getMySentParcels,
  getMyIncomingParcels,
  updateParcelStatus,
  makeConfirmDelivery,
  blockParcel,
};
