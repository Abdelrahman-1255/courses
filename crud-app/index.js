import express from "express";
import coursesRoute from "./routes/courses.route.js";
import usersRoute from "./routes/users.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as httpStatusText from "./utils/httpStatusText.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb connected");
});
app.use(express.json());
app.use(cors());
app.use("/api/courses", coursesRoute);
app.use("/api/users", usersRoute);

// Global middleware for not found routes
app.use((req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This resource is not available on this server!",
  });
  next();
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message || "Internal Server Error",
    code: err.statusCode || 500,
    data: null,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
