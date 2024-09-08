import express from "express";
import "dotenv/config";
import testRouter from "./src/routers/test.router.js";
import UserRouter from "./src/routers/userRouter.js";
import DatabaseModel from "./src/models/DatabaseModel.js";
import NotFoundRouter from "./src/routers/404.router.js";
import "./src/db/connection.js";

//middleware

const app = express();
const port = process.env.PORT || 8383;
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routers

app.use("/", testRouter);
app.use("/", NotFoundRouter);
app.use("/user", UserRouter);

// Start the server
// Start the server and create tables
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Create all tables
  await DatabaseModel.createTables(); // Correct call
});
