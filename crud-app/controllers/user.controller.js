import { User } from "../models/user.model.js";
import { asyncWrapper } from "../middlewares/asyncWrappper.js";
import * as httpStatusText from "../utils/httpStatusText.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJWT } from "../utils/generateJWT.js";

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: 0, password: false })
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { users },
  });
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new AppError(
      "Email already in use",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = await generateJWT({ email: newUser.email, id: newUser._id });
  newUser.token = token;
  await newUser.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new AppError(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const isPasswordValid = await bcrypt.compare(
    String(password),
    String(user.password)
  );
  if (!isPasswordValid) {
    const error = new AppError(
      "Invalid email or password",
      401,
      httpStatusText.FAIL
    );
    return next(error);
  }
  const token = await generateJWT({ email: user.email, id: user._id });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { token } });
});

export { getAllUsers, registerUser, loginUser };
