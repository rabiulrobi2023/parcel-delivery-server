import dotenv from "dotenv";
dotenv.config();

interface IEnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  SALT: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRE: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRE: string;
  SUPER_ADMIN_EMAIL:string;
  SUPER_ADMIN_PASS:string


}

const envVar = (): IEnvVars => {
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    SALT: process.env.SALT as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
      SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string
  };
};

export const envVariable = envVar();
