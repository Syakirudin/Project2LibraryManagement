import connection from "../db/connection.js";

class AuthorModel {
    // Create a new author
    async createAuthor(name) {
        const query = `INSERT INTO authors (name) VALUES (?)`;
        try {
            const [insertResult] = await connection.execute(query, [name]);
            return insertResult.insertId; // Return the new author ID
        } catch (error) {
            console.error("Error inserting author into database:", error);
            throw new Error("Error inserting author into database.");
        }
    }

    // Fetch all authors
    async findAllAuthors() {
        const query = `SELECT * FROM authors`;
        try {
            const [rows] = await connection.execute(query);
            return rows;
        } catch (error) {
            console.error("Error fetching authors from database:", error);
            throw new Error("Error fetching authors from database.");
        }
    }

    // Find an author by name
    async findAuthorByName(author_name) {
        const query = `SELECT * FROM authors WHERE name = ?`;
        try {
            const [rows] = await connection.execute(query, [author_name]);
            return rows[0]; // Return the first matching author, or undefined if not found
        } catch (error) {
            console.error("Error finding author by name:", error);
            throw new Error("Error finding author by name.");
        }
    }
}

export default new AuthorModel();
