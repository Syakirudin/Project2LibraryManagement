import express from 'express';
import BookController from '../controllers/bookController.js';

const BookRouter = express.Router();

// Route to add a new book
BookRouter.post('/add', (req, res) => BookController.addBook(req, res));

// Route to edit a book by ID
BookRouter.put('/edit/:id', (req, res) => BookController.editBookById(req, res));

// Route to find books by title or author
BookRouter.get('/search', (req, res) => BookController.findBookByTitleOrAuthor(req, res));

// Route to get all books
BookRouter.get('/', (req, res) => BookController.findAllBooks(req, res));

// Route to delete a book by ID
BookRouter.delete('/delete/:id', (req, res) => BookController.deleteBook(req, res));

export default BookRouter;
