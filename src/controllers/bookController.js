import BookModel from '../models/bookModel.js';

class BookController {
    // Create a new book
    static async addBook(req, res) {
        const { title, author, genre } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required." });
        }

        try {
            const bookId = await BookModel.addBook({ title, author, genre });
            return res.status(201).json({ message: "Book added successfully", bookId });
        } catch (error) {
            return res.status(500).json({ message: "Failed to add book", error: error.message });
        }
    }

    // Get all books
    static async getAllBooks(req, res) {
        try {
            const books = await BookModel.findAll();
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch books", error: error.message });
        }
    }

    // Search books by title, author, or genre
    static async searchBooks(req, res) {
        const { title, author, genre } = req.query; // using query params for searching

        try {
            const books = await BookModel.findByAttributes(title, author, genre);
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: "Failed to search books", error: error.message });
        }
    }

    // Edit an existing book
    static async updateBook(req, res) {
        const { id } = req.params;
        const { title, author, genre } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required." });
        }

        try {
            const affectedRows = await BookModel.editBook(id, title, author, genre);
            if (affectedRows > 0) {
                return res.status(200).json({ message: "Book updated successfully" });
            } else {
                return res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to update book", error: error.message });
        }
    }

    // Delete a book
    static async deleteBook(req, res) {
        const { id } = req.params;

        try {
            const affectedRows = await BookModel.deleteBook(id);
            if (affectedRows > 0) {
                return res.status(200).json({ message: "Book deleted successfully" });
            } else {
                return res.status(404).json({ message: "Book not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete book", error: error.message });
        }
    }
}

export default  BookController;
