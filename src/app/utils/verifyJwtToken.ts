import jwt from "jsonwebtoken";

export const verifyJwtToken = (token: string, sectret: string) => {
  const verifiedToken = jwt.verify(token, sectret);
  return verifiedToken;
};
