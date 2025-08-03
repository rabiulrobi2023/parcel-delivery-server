import httpstatus from "http-status-codes";
import { Response } from "express";
interface IResponseData<T> {
  statusCode?: number;
  message: string;
  data: T;
}
export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data.statusCode || httpstatus.OK).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};
