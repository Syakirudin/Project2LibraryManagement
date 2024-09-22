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

    //update book info
    async updateBookById(bookId, updatedData) {
        const { title, published_date, authorName } = updatedData; // Destructure the updated data
    
        const updateBookQuery = `
            UPDATE books
            SET title = ?, published_date = ?
            WHERE id = ?;
        `;
    
        const updateAuthorQuery = `
            UPDATE authors
            SET name = ?
            WHERE id = (SELECT author_id FROM books WHERE id = ?);
        `;
    
        try {
            // Update the book's title and published date
            await connection.execute(updateBookQuery, [title, published_date, bookId]);
    
            // Update the author's name (if necessary)
            await connection.execute(updateAuthorQuery, [authorName, bookId]);
    
            return { message: 'Book updated successfully' };
        } catch (error) {
            console.error("Error updating book in database:", error);
            throw new Error("Error updating book in database.");
        }
    }


    async deleteBooksById(bookId) {
        const deleteBookQuery = `
            DELETE FROM books
            WHERE id = ?;
        `;
    
        try {
            const [result] = await connection.execute(deleteBookQuery, [bookId]);
            
            if (result.affectedRows === 0) {
                throw new Error("Book not found or already deleted");
            }
    
            return { message: "Book deleted successfully" };
        } catch (error) {
            console.error("Error deleting book from database:", error);
            throw new Error("Error deleting book from database.");
        }
    }
    
        
    
    
}

export default new BooksModel();
