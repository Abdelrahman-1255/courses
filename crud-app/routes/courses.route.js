import express from "express";
import * as courseController from "../controllers/course.controller.js";
import { validateCourse } from "../middlewares/validateCourse.js";
import { allowedTo } from "../middlewares/allowedTo.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { userRoles } from "../utils/userRoles.js";

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    validateCourse,
    verifyToken,
    allowedTo(userRoles.MODERATOR),
    validateCourse,
    courseController.addCourse
  );
router
  .route("/:courseId")
  .get(courseController.getCourseById)
  .patch(courseController.updateCourse)
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MODERATOR),
    courseController.deleteCourse
  );

export default router;
