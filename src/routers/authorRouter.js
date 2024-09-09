import express from 'express';
import AuthorController from '../controllers/authorController.js';

const AuthorRouter = express.Router();

AuthorRouter.post('/create', AuthorController.createAuthor);
AuthorRouter.get('/all', AuthorController.getAllAuthors);

export default AuthorRouter;

