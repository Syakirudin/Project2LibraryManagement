import connection from "../db/connection.js";

class BookModel {
  // Add a new book
  async addBook({ title, author_id, published_date }) {
    const [result] = await connection.execute(
      "INSERT INTO books (title, author_id, published_date) VALUES (?, ?, ?)",
      [title, author_id, published_date]
    );
    return result;
  }

  // Edit a book by ID
  async editBookById({ id, title, author_id, published_date }) {
    const [result] = await connection.execute(
      "UPDATE books SET title = ?, author_id = ?, published_date = ? WHERE id = ?",
      [title, author_id, published_date, id]
    );
    return result;
  }

  // Find book by title or author
  async findBookByTitleOrAuthor(title, author_id) {
    const [rows] = await connection.execute(
      `SELECT * FROM books WHERE title = ? OR author_id = ?`,
      [title, author_id]
    );
    return rows;
  }

  // Find all books
  async findAllBooks() {
    const [rows] = await connection.execute(
      `SELECT books.id, books.title, books.published_date, authors.name as author
            FROM books
            JOIN authors ON books.author_id = authors.id`
    );
    return rows;
  }

  // Delete a book by ID
  async deleteBook({ id }) {
    const [result] = await connection.execute(
      "DELETE FROM books WHERE id = ?",
      [id]
    );
    return result;
  }

  // Check if book exists by title
  async findBookByTitle(title) {
    const [rows] = await connection.execute(
      "SELECT * FROM books WHERE title = ?",
      [title]
    );
    return rows[0]; // Return the first found record
  }

  // Check if author exists by ID (author ID comes from another table)
  async findAuthorById(author_id) {
    const [rows] = await connection.execute(
      "SELECT * FROM authors WHERE id = ?",
      [author_id]
    );
    return rows[0]; // Return the first found record
  }

  // Find author by name
  async findAuthorByName(authorName) {
    const [rows] = await connection.execute(
      "SELECT * FROM authors WHERE name = ? LIMIT 1",
      [authorName]
    );
    return rows[0]; // Return the author object if found
  }

  async createAuthor(authorName) {
    const [result] = await connection.execute(
      "INSERT INTO authors (name) VALUES (?)",
      [authorName]
    );
    return result.insertId; // Return the ID of the new author
  }
}

export default new BookModel();
