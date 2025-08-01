import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Parcel delivery server is running");
});

export default app;
