import express from "express";
import coursesRoute from "./routes/courses.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/courses", coursesRoute);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb connected");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
