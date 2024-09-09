import express from "express";
import "dotenv/config";
import testRouter from "./src/routers/test.router.js";
import UserRouter from "./src/routers/userRouter.js";
import BookRouter from "./src/routers/bookRouter.js";
import AuthorRouter from "./src/routers/authorRouter.js";
import DatabaseModel from "./src/models/DatabaseModel.js";
import "./src/db/connection.js";

// Middleware
const app = express();
const port = process.env.PORT || 8383;
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routers
app.use("/", testRouter); // Ensure `testRouter` is correctly defined
app.use("/user", UserRouter);
app.use("/book", BookRouter);
app.use("/author", AuthorRouter);

// Uncomment if `NotFoundRouter` is used
// app.use("*", NotFoundRouter);

// Start the server and create tables
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await DatabaseModel.createTables(); // Ensure this function is correctly implemented
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
});
