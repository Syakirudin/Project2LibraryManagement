import connection from '../db/connection.js';
import bcrypt from 'bcrypt';

class UserModel {
    async createUser(userData) {
        const { name, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

        try {
            const [insertResult] = await connection.execute(query, [name, email, hashedPassword]);
            return insertResult.insertId;
        } catch (error) {
            console.error("Error inserting user into database:", error);
            throw error;
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
            throw error;
        }
    }

    async verifyUser(email, password) {
        const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
        try {
            const [rows] = await connection.execute(query, [email, password]);
            return rows[0]; // Return the first match if found
        } catch (error) {
            console.error("Error verifying user credentials:", error);
            throw error;
        }
    }

    async findAllUsers() {
        const query = `SELECT * FROM users`;
        try {
            const [rows] = await connection.execute(query);
            return rows; // Return all rows
        } catch (error) {
            console.error("Error fetching users from database:", error);
            throw error;
        }
    }
}

export default new UserModel();
