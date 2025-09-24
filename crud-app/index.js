import express from "express";
import coursesRoute from "./routes/courses.route.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use("/api/courses", coursesRoute);
const url =
  "mongodb+srv://boudy:boudy125@cluster0.goxe9od.mongodb.net/codeZone?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url).then(() => {
  console.log("mongodb connected");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
