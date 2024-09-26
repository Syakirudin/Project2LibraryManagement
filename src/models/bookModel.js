// CREATE TABLE IF NOT EXISTS books (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     author VARCHAR(255) NOT NULL,
//     genre VARCHAR(100),
//     date_add DATETIME DEFAULT CURRENT_TIMESTAMP
// );

import connection from "../db/connection.js";

class BookModel {
    // Create the books table if it doesn't exist
    static async createTable() {
        const query = `
          CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(100),
            date_add DATETIME DEFAULT CURRENT_TIMESTAMP
        );`;
        await connection.execute(query); // Changed from executeQuery to connection.execute
    }

    // Add a new book to the books table
    static async addBook({ title, author, genre }) {
        const [result] = await connection.execute(
            'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)',
            [title, author, genre]
        );
        return result.insertId; // Return the inserted book's ID
    }

    // Find all books
    static async findAll() {
        const [rows] = await connection.execute('SELECT * FROM books');
        return rows;
    }

    // Find books by title, author, or genre
    static async findByAttributes(title, author, genre) { // Renamed for clarity
        const [rows] = await connection.execute(
            'SELECT * FROM books WHERE title = ? OR author = ? OR genre = ?',
            [title, author, genre]
        );
        return rows;
    }

    // Edit book details
    static async editBook(id, title, author, genre) {
        const [result] = await connection.execute(
            'UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?',
            [title, author, genre, id]
        );
        return result.affectedRows; // Return the number of rows affected
    }

    // Delete a book by ID
    static async deleteBook(id) {
        const [result] = await connection.execute(
            'DELETE FROM books WHERE id = ?',
            [id]
        );
        return result.affectedRows; // Return the number of rows deleted
    }
}

export default BookModel;
