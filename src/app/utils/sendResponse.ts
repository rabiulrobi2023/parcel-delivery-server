import httpstatus from "http-status-codes";
import { Response } from "express";
type TResponseData<T> = {
  statusCode?: number;
  message: string;
  data: T;
};
export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
  res.status(data.statusCode || httpstatus.OK).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};
