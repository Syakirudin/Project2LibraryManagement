import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const UserRouter = express.Router();

// Route to create a new user
UserRouter.post('/create', UserController.createUser);

// Route to log in a user and get a JWT token
UserRouter.post('/login', UserController.login);

// Route to get all users (protected route)
UserRouter.get('/all', UserController.getAllUsers); 

// Route to get user profile (protected route)
UserRouter.get('/profile', authenticateJWT, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user // This should be set by authenticateJWT middleware
    });
});

export default UserRouter;
