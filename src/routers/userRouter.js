import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const UserRouter = express.Router();

UserRouter.post('/create', UserController.createUser);
UserRouter.post('/login', UserController.login);
UserRouter.get('/all', (req, res) => UserController.getAllUsers(req, res));


UserRouter.get('/profile', authenticateJWT, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

export default UserRouter;
