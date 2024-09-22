import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateJWT, authorizeRole } from '../middleware/authMiddleware.js';

const UserRouter = express.Router();

// Route to create a new user
UserRouter.post('/create', UserController.createUser);

// Route to log in a user and get a JWT token
UserRouter.post('/login', UserController.login);

// Route to get all users (protected route)
UserRouter.get('/all', authenticateJWT, UserController.getAllUsers);

// Route to get all users (admin only)
UserRouter.get('/all', authenticateJWT, authorizeRole(['admin']), UserController.getAllUsers);

// Route to promote a user to admin
UserRouter.patch('/promote/:id', authenticateJWT, authorizeRole(['admin']), UserController.promoteUser);


// Route for admin-only actions (e.g., delete a user)
// UserRouter.delete('/delete/:id', authenticateJWT, authorizeRole(['admin']), UserController.deleteUser);

// Route to get user profile (protected route)
UserRouter.get('/profile', authenticateJWT, (req, res) => {
    if (req.user) {
        res.json({ user: req.user, message: 'User is logged in' });
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
});



export default UserRouter;
