import BooksModel from "../models/bookModels.js";

class BooksController {
    async createBooks(req, res) {
        const { title, author_name, published_date } = req.body;
        try {
            const book = await BooksModel.createBooks({ title, author_name, published_date });
            res.status(201).json({ message: "Book created successfully", book });
        } catch (error) {
            res.status(500).json({ message: "Error creating book", error: error.message });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = await BooksModel.findAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: "Error fetching books", error: error.message });
        }
    }
}

export default new BooksController();
