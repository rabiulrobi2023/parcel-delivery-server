import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import { notFoundRoute } from "./app/middlewires/notFoundRoute";
import globalErrorHandler from "./app/middlewires/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Parcel delivery server is running");
});
app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
