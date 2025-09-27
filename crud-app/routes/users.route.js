import express from "express";
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.route("/").get(verifyToken, userController.getAllUsers);
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

export default router;
