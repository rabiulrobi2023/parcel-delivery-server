/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import app from "./app";
import { envVariable } from "./config/envConfig";

let server: Server;

const startServer = async () => {
  try {
    server = app.listen(envVariable.PORT, () => {
      console.log(
        `Parcel delivery server app is running on port ${envVariable.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
})();
