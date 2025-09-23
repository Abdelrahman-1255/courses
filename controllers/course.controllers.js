import { coursers } from "../data/inmemoryDB.js";
import { validationResult } from "express-validator";
export const getAllCourses = (req, res) => {
  res.status(200).json(coursers);
};

export const getCourseById = (req, res) => {
  const id = req.params.courseId;
  const course = coursers.find((c) => c.id === +id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json(course);
};

export const addCourse = (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = { id: coursers.length + 1, ...req.body };
  coursers.push(course);
  res.status(201).json(course);
};

export const updateCourse = (req, res) => {
  const id = +req.params.courseId;
  let course = coursers.find((c) => c.id === id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  course = { ...course, ...req.body };
  res.status(200).json(course);
};

export const deleteCourse = (req, res) => {
  const id = +req.params.courseId;
  const index = coursers.findIndex((c) => c.id === id);
  if (index !== -1) {
    coursers.splice(index, 1);
  }
  res.status(200).send({ success: true });
};
