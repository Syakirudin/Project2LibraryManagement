import express from 'express';
import AuthController from '../controllers/authController.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', (req, res) => AuthController.register(req, res));
AuthRouter.post('/login', (req, res) => AuthController.login(req, res));

export default AuthRouter;
