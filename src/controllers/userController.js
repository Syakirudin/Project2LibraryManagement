import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

class UserController {
  // Register a new user
  async createUser(req, res) {
    const { name, email, password, role = "user" } = req.body; // Default role is 'user'

    try {
      // Check if the user already exists
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Check if the role is valid
      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      // Create a new user
      const user = await UserModel.createUser({ name, email, password, role });

      // Generate JWT token after successful registration
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      console.log("Generated Token:", token);

      res.status(201).json({
        message: "User created successfully",
        token, // Send token to client
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }, // Include role in response
      });
    } catch (error) {
      console.error("Error creating user:", error); // Log the error
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  // Login existing user
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verify the user credentials
      const user = await UserModel.verifyUser(email, password);

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // Log the token for debugging purposes
      console.log("Generated JWT Token:", token);

      res.status(200).json({
        message: "Login successful",
        token, // Send token to client
        user: { id: user.id, name: user.name, email: user.email }, // Optionally send user details
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(400).json({ message: error.message });
    }
  }

  // Fetch all users
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  }

  async promoteUser(req, res) {
    const userId = req.params.id; // Get user ID from the route
    const { role } = req.body; // Get the new role from the request body
  
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
  
    try {
      const user = await UserModel.findUserById(userId); // Fetch user by ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await UserModel.updateUserRole(userId, role); // Update the user's role
      res.status(200).json({ message: `User promoted to ${role} successfully` });
    } catch (error) {
      console.error("Error promoting user:", error);
      res.status(500).json({ message: "Error promoting user", error: error.message });
    }
  }
  
}

export default new UserController();
