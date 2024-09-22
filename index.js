import express from "express";
import cors from 'cors';
import "dotenv/config";
import testRouter from "./src/routers/test.router.js";
import UserRouter from "./src/routers/userRouter.js";
import BookRouter from "./src/routers/bookRouter.js";
import AuthorRouter from "./src/routers/authorRouter.js";
import DatabaseModel from "./src/models/DatabaseModel.js";
import "./src/db/connection.js"; // Ensure database connection is properly established

// Middleware setup
const app = express();
const port = process.env.PORT || 8383;
 
// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));

// Register routers
app.use("/", testRouter); // Ensure `testRouter` is correctly defined
app.use("/user", UserRouter);
app.use("/book", BookRouter);
app.use("/author", AuthorRouter);

// Uncomment if `NotFoundRouter` is used for handling undefined routes
// app.use("*", NotFoundRouter);

// Start the server and create tables
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await DatabaseModel.createTables(); // Ensure this function creates tables correctly
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
});
