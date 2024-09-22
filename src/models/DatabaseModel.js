import connection from "../db/connection.js";

class DatabaseModel {
  static createTables = async () => {
    try {
      // Queries to create tables
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(10) NULL
          
        );
      `;
      const createAuthorsTable = `
        CREATE TABLE IF NOT EXISTS authors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
      `;
      const createBooksTable = `
        CREATE TABLE IF NOT EXISTS books (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author_id INT,
          FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
        );
      `;

      const createLibraryTransactionsTable = `
        CREATE TABLE IF NOT EXISTS library_transactions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          phone_number VARCHAR(255) NOT NULL,
          book_id INT,
          borrow_date DATE,
          return_date DATE
        );

      `;

      // Execute table creation queries
      await connection.query(createUsersTable);
      await connection.query(createAuthorsTable);
      await connection.query(createBooksTable);
      await connection.query(createLibraryTransactionsTable);

      // Log a single message after all tables are created
      console.log("All tables have been created or already exist.");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  };
}

export default DatabaseModel;
