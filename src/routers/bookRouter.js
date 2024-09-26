import express from 'express';
import BookController from '../controllers/bookController.js';

const BookRouter = express.Router();

// Routes for book management
BookRouter.post('/add', BookController.addBook);
BookRouter.get('/', BookController.getAllBooks);
BookRouter.get('/search', BookController.searchBooks); // For searching books by title, author, or genre
BookRouter.put('/edit/:id', BookController.updateBook); // Update book by id
BookRouter.delete('/delete/:id', BookController.deleteBook); // Delete book by id

export default BookRouter;
