import express from "express";
import coursesRoute from "./routes/courses.route.js";

const app = express();
app.use(express.json());

app.use("/api/courses", coursesRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
