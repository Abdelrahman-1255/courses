import AppError from "../utils/appError.js";

import * as httpStatusText from "../utils/httpStatusText.js";
export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!req.currentUser || !roles.includes(req.currentUser.role)) {
      const error = new AppError(
        "You are not allowed to access this route",
        403,
        httpStatusText.ERROR
      );
      return next(error);
    }
    next();
  };
};
