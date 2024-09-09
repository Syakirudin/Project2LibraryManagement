import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserController {
    async createUser(req, res) {
        const { name, email, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await UserModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Create a new user
            const userId = await UserModel.createUser({ name, email, password });
            res.status(201).json({
                message: 'User created successfully',
                userId
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating user',
                error: error.message
            });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
    
        try {
            // Verify the user credentials
            const user = await UserModel.verifyUser(email, password);
            
            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });
    
            res.json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching users',
                error: error.message
            });
        }
    }
}

export default new UserController();
