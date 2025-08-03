import dotenv from "dotenv";
dotenv.config();

interface IEnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  SALT: string;
}

const envVar = (): IEnvVars => {
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    SALT: process.env.SALT as string,
  };
};

export const envVariable = envVar();
