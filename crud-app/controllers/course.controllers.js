import { Course } from "../models/courses.model.js";
import { validationResult } from "express-validator";
import * as httpStatusText from "../utils/httpStatusText.js";
export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.courseId;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "Course not found" },
      });
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
      code: 400,
    });
  }
};

export const addCourse = async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { errors: errors.array() },
    });
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { course } });
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    if (updatedCourse.matchedCount === 0) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "Course not found" },
      });
    }
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { updatedCourse },
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: error.message,
      code: 400,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.courseId });
    if (deletedCourse.deletedCount === 0) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { message: "Course not found" },
      });
    }
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (error) {
    return res
      .status(400)
      .json({ status: httpStatusText.ERROR, data: { message: error.message } });
  }
};
