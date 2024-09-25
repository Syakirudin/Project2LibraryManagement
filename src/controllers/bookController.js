import BookModel from "../models/bookModel.js";

class BookController {
  // Add a new book
  // Controller method to add a book using author name instead of author_id
  async addBook(req, res) {
    const { title, author, published_date } = req.body; // Now receiving the author name

    try {
      // Step 1: Find the author by name
      const existingAuthor = await BookModel.findAuthorByName(author); // Adjust your model method accordingly
      let author_id;

      // If author exists, use the author_id; otherwise return error or handle adding new author logic
      if (existingAuthor) {
        author_id = existingAuthor.id;
      } else {
        return res.status(400).json({ message: "Author not found" });
      }

      // Step 2: Check if the book title already exists
      const existingBook = await BookModel.findBookByTitle(title);
      if (existingBook) {
        return res
          .status(400)
          .json({ message: "Book with this title already exists" });
      }

      // Step 3: Add the book using the resolved author_id
      const result = await BookModel.addBook({
        title,
        author_id,
        published_date,
      });
      return res
        .status(201)
        .json({ message: "Book added successfully", bookId: result.insertId });
    } catch (error) {
      console.error(`Error adding book: ${error.message}`);
      return res
        .status(500)
        .json({ message: "Failed to add book", error: error.message });
    }
  }

  // Edit a book by ID
  async editBookById(req, res) {
    const { id } = req.params;
    const { title, author_id, published_date } = req.body;

    try {
      const result = await BookModel.editBookById({
        id,
        title,
        author_id,
        published_date,
      });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update book", error: error.message });
    }
  }

  // Find a book by title or author
  async findBookByTitleOrAuthor(req, res) {
    const { title, author } = req.query;

    try {
      const books = await BookModel.findBookByTitleOrAuthor(title, author);
      res.status(200).json(books);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to find book", error: error.message });
    }
  }

  // Get all books
  async findAllBooks(req, res) {
    try {
      const books = await BookModel.findAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch books", error: error.message });
    }
  }

  // Delete a book by ID
  async deleteBook(req, res) {
    const { id } = req.params;

    try {
      const result = await BookModel.deleteBook({ id });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete book", error: error.message });
    }
  }
}

// Export a singleton instance of BookController
export default new BookController();
