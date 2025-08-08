import httpstatus from "http-status-codes";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Parcel } from "./parcel.model";
import { ParcelService } from "./parcel.service";

const createParcel = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const parcelData = req.body;

  const result = await ParcelService.createParcel(userId, parcelData);
  sendResponse(res, {
    message: "Parcel created successfully",
    data: result,
  });
});

const getAllParcel = catchAsync(async (req, res, next) => {
  const result = await ParcelService.getAllParcel();
  sendResponse(res, {
    message: "All parcel retrived successfully",
    data: result,
  });
});

const cancelParcel = catchAsync(async (req, res, next) => {
  const parcelId = req.params.id;
  const sender = req.user?.id;
  const note = req.body;

  const result = await ParcelService.cancelParcel(parcelId, sender, note);
  sendResponse(res, {
    message: "Parcel cancelled successfully",
    data: result,
  });
});

const getMysentParcels = catchAsync(async (req, res, next) => {
  const sender = req.user.id;
  const result = await ParcelService.getMySentParcels(sender);
  sendResponse(res, {
    message: "Parcel retrived successfully",
    data: result,
  });
});

const getMyIncomingParcels = catchAsync(async (req, res, next) => {
  const receiverId = req.user.id;
  const result = await ParcelService.getMyIncomingParcels(receiverId);
  if (result.length < 1) {
    sendResponse(res, {
      statusCode: httpstatus.NOT_FOUND,
      message: "There is no any incomming parcels",
      data: result,
    });
  }
  sendResponse(res, {
    message: "Parcel retrived successfully",
    data: result,
  });
});

const updateParcelStatus = catchAsync(async (req, res, next) => {
  const parcelId = req.params.id;
  const user = req.user;
  const updateData = req.body;
  const result = await ParcelService.updateParcelStatus(
    parcelId,
    user,
    updateData
  );
  sendResponse(res, {
    message: "Parcel status update successfull",
    data: result,
  });
});

const makeConfirmDelivery = catchAsync(async (req, res, next) => {
  const parcelId = req.params.id;
  const userId = req.user.id;
  const updateData = req.body;
  const result = await ParcelService.makeConfirmDelivery(
    parcelId,
    userId,
    updateData
  );
  sendResponse(res, {
    message: "Parcel delivary confirmed",
    data: result,
  });
});

export const ParcelContrller = {
  createParcel,
  getAllParcel,
  cancelParcel,
  getMysentParcels,
  getMyIncomingParcels,
  updateParcelStatus,
  makeConfirmDelivery
};
