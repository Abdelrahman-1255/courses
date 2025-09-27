import jwt from "jsonwebtoken";
export const generateJWT = (payload) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY environment variable is not defined.");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });
  return token;
};
