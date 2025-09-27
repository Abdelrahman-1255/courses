import jwt from "jsonwebtoken";
import * as httpStatusText from "../utils/httpStatusText.js";
import AppError from "../utils/appError.js";
export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) {
    const error = new AppError("Token is missing", 401, httpStatusText.ERROR);
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = new AppError("Invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};
