import { Course } from "../models/courses.model.js";
import { validationResult } from "express-validator";
import * as httpStatusText from "../utils/httpStatusText.js";
import { asyncWrapper } from "../middlewares/asyncWrappper.js";
import AppError from "../utils/appError.js";
export const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  // console.log(query);
  const limit = parseInt(query.limit) || 10;
  const page = parseInt(query.page) || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});

export const getCourseById = asyncWrapper(async (req, res, next) => {
  const id = req.params.courseId;
  const course = await Course.findById(id);
  if (!course) {
    const error = new AppError("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});

export const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    const error = new AppError(errorMessages, 400, httpStatusText.FAIL);
    return next(error);
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
});

export const updateCourse = asyncWrapper(async (req, res) => {
  const updatedCourse = await Course.updateOne(
    { _id: req.params.courseId },
    { $set: { ...req.body } }
  );
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { updatedCourse },
  });
});

export const deleteCourse = asyncWrapper(async (req, res, next) => {
  const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
  if (deletedCourse.deletedCount === 0) {
    const error = new AppError("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});
