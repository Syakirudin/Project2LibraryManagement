import express from "express";
import BooksController from "../controllers/bookController.js";

const BookRouter = express.Router();

// Handle POST request to create a book
BookRouter.post("/create", BooksController.createBooks);

// Handle GET request to fetch all books as JSON
BookRouter.get("/all", BooksController.getAllBooks);

//update 
BookRouter.put("/update", BooksController.updateBooks);

// Route to delete a book by its ID
BookRouter.delete("/delete/:bookId", BooksController.deleteBook);

// Handle GET request to fetch all books and render them using EJS
BookRouter.get("/", async (req, res) => {
    try {
        const books = await BooksController.getAllBooksForView(); // Fetch books from a new controller method
        res.render('books', { books }); // Render the 'books' view with fetched books
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
});

export default BookRouter;
