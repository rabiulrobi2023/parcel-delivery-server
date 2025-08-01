import dotenv from "dotenv";
dotenv.config();

interface IEnvVars {
  PORT: string;
}

const envVar = (): IEnvVars => {
  return {
    PORT: process.env.PORT as string,
  };
};

export const envVariable = envVar();
