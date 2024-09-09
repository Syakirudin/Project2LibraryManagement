import connection from "../db/connection.js";

class BooksModel {
    async createBooks(bookData) {
        const { title, author_name, published_date } = bookData;

        // Find or create the author first
        let author_id;
        const author = await this.findAuthorByName(author_name);
        if (author) {
            author_id = author.id;
        } else {
            // Handle the case where author doesn't exist. 
            // You might need to create a new author.
            // For simplicity, throw an error or handle this case.
            throw new Error("Author does not exist");
        }

        const query = `INSERT INTO books (title, author_id, published_date) VALUES (?, ?, ?)`;

        try {
            const [insertResult] = await connection.execute(query, [
                title,
                author_id,
                published_date,
            ]);
            return insertResult.insertId;
        } catch (error) {
            console.error("Error inserting book into database:", error);
            throw new Error("Error inserting book into database.");
        }
    }

    async findAuthorByName(name) {
        const query = `SELECT * FROM authors WHERE name = ?`;
        try {
            const [rows] = await connection.execute(query, [name]);
            return rows[0]; // Return the author object
        } catch (error) {
            console.error("Error finding author by name:", error);
            throw new Error("Error finding author by name.");
        }
    }

    // Other methods...
}

export default new BooksModel();
