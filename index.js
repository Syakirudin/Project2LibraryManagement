import express from "express";
import cors from 'cors';
import "dotenv/config";
import AuthRouter from './src/routers/authRouter.js';
import { authenticateJWT, authorizeAdmin } from './src/middleware/authMiddleware.js';
import { testConnection } from './src/db/connection.js'; 

// Initialize the app
const app = express();
const port = process.env.PORT || 8383;

// Middleware for parsing request bodies and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));

// Auth Routes
app.use('/auth', AuthRouter);

// Admin route (protected by JWT authentication and admin authorization)
app.get("/admin", authenticateJWT, authorizeAdmin, (req, res) => {
  res.send("Welcome to the Admin Dashboard!");
});

// User route (only JWT authentication is required)
app.get("/user", authenticateJWT, (req, res) => {
  res.send("Welcome to the User Dashboard!");
});

// Start the server and test database connection
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await testConnection(); // Test the database connection when server starts
});
