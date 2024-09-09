import connection from "../db/connection.js";
import bcrypt from "bcrypt";

class UserModel {
  async createUser(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    try {
      const [insertResult] = await connection.execute(query, [
        name,
        email,
        hashedPassword,
      ]);
      return insertResult.insertId;
    } catch (error) {
      console.error("Error inserting user into database:", error);
      throw new Error("Error inserting user into database.");
    }
  }

  // Method to find a user by email
  async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const [rows] = await connection.execute(query, [email]);
      return rows[0]; // Return the first user found
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user by email.");
    }
  }

  async verifyUser(email, password) {
    // Fetch user by email first
    const query = `SELECT * FROM users WHERE email = ?`;
    
    try {
        const [rows] = await connection.execute(query, [email]);
        const user = rows[0]; // Get the first user found

        if (!user) {
            throw new Error("User not found");
        }

        // Compare the provided password with the hashed password from DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        // Return user data if authentication is successful
        return user;
    } catch (error) {
        console.error("Error verifying user credentials:", error);
        throw new Error("Error verifying user credentials.");
    }
  }

  async findAllUsers() {
    const query = `SELECT * FROM users`;
    try {
      const [rows] = await connection.execute(query);
      return rows; // Return all rows
    } catch (error) {
      console.error("Error fetching users from database:", error);
      throw new Error("Error fetching users from database.");
    }
  }
}

export default new UserModel();
