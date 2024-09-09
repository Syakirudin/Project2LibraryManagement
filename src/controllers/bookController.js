import BooksModel from "../models/bookModels.js";
import AuthorModel from "../models/authorModel.js";

class BooksController {
    async createBooks(req, res) {
        const { title, author_name, published_date } = req.body;

        try {
            // Step 1: Check if the author already exists
            let author = await AuthorModel.findAuthorByName(author_name);

            // Step 2: If the author does not exist, create a new one
            if (!author) {
                const author_id = await AuthorModel.createAuthor(author_name);
                author = { id: author_id }; // Use the newly created author ID
            }

            // Step 3: Now that we have the author ID, create the book
            const bookId = await BooksModel.createBook({
                title,
                author_id: author.id,
                published_date
            });

            res.status(201).json({ message: "Book and author created successfully", bookId });
        } catch (error) {
            console.error("Error creating book:", error);
            res.status(500).json({ message: "Error creating book", error: error.message });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = await BooksModel.findAllBooks();
            res.status(200).json(books);
        } catch (error) {
            console.error("Error fetching books:", error);
            res.status(500).json({ message: "Error fetching books", error: error.message });
        }
    }

    async getAllBooksForView() {
        try {
            const books = await BooksModel.findAllBooks();
            return books; // Return books to the view handler
        } catch (error) {
            console.error("Error fetching books:", error);
            throw new Error("Error fetching books for view");
        }
    }
}

export default new BooksController();
