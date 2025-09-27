import express from "express";
import * as courseController from "../controllers/course.controller.js";
import { body } from "express-validator";

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    [
      body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 2 })
        .withMessage("Title must be at least 2 characters long"),
      body("price").notEmpty().withMessage("Price is required"),
    ],
    courseController.addCourse
  );
router
  .route("/:courseId")
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

export default router;
