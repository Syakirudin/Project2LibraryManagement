import connection from "../db/connection.js";

class BooksModel {
    // Create a new book with the provided author ID
    async createBook({ title, author_id, published_date }) {
        const query = `INSERT INTO books (title, author_id, published_date) VALUES (?, ?, ?)`;
        try {
            const [insertResult] = await connection.execute(query, [title, author_id, published_date]);
            return insertResult.insertId; // Return the new book ID
        } catch (error) {
            console.error("Error inserting book into database:", error);
            throw new Error("Error inserting book into database.");
        }
    }

    // Fetch all books along with the author name
    async findAllBooks() {
        const query = `
            SELECT books.id, books.title, books.published_date, authors.name AS author_name
            FROM books
            JOIN authors ON books.author_id = authors.id
        `;
        try {
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            console.error("Error fetching books from database:", error);
            throw new Error("Error fetching books from database.");
        }
    }
}

export default new BooksModel();
