import { body } from "express-validator";

export const validateCourse = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long"),
  body("price").notEmpty().withMessage("Price is required"),
];
