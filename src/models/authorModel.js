import connection from "../db/connection.js";

class AuthorModel {
    async createAuthor(authorData) {
        const { name } = authorData;
        const query = `INSERT INTO authors (name) VALUES (?)`;
        try {
            const [insertResult] = await connection.execute(query, [name]);
            return insertResult.insertId;
        } catch (error) {
            console.error("Error inserting author into database:", error);
            throw new Error("Error inserting author into database.");
        }
    }

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
}

export default new AuthorModel();