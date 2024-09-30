// CREATE TABLE IF NOT EXISTS lib_transaction (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     book_title VARCHAR(255) NOT NULL,
//     borrower VARCHAR(255) NOT NULL,
//     phone_no VARCHAR(15) NOT NULL,
//     return_date DATE,
//     status VARCHAR(50) NOT NULL,
//     FOREIGN KEY (book_title) REFERENCES books(title) ON DELETE CASCADE
// );

import connection from "../db/connection.js";

class TranscModel {
    static async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS lib_transaction (
            id INT AUTO_INCREMENT PRIMARY KEY,
            book_title VARCHAR(255) NOT NULL,
            borrower VARCHAR(255) NOT NULL,
            phone_no VARCHAR(15) NOT NULL,
            return_date DATE,
            status ENUM('borrowed', 'returned') NOT NULL,
            FOREIGN KEY (book_title) REFERENCES books(title) ON DELETE CASCADE
        );`;
        await connection.execute(query); 
    }


    static async addTransc({ book_title, borrower, phone_no, return_date, status }) {
        const [result] = await connection.execute(
            'INSERT INTO lib_transaction (book_title, borrower, phone_no, return_date, status) VALUES (?, ?, ?, ?, ?)',
            [book_title, borrower, phone_no, return_date, status]
        );
        return result.insertId; // Return the inserted book's ID
    }


    static async findAll() {
        const [rows] = await connection.execute('SELECT * FROM lib_transaction');
        return rows;
    }


    static async editTransc(id, book_title, borrower, phone_no, return_date, status) {
        // Check if the status is either 'borrowed' or 'returned'
        const validStatuses = ['borrowed', 'returned'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status. Status must be 'borrowed' or 'returned'.");
        }
    
        // Proceed with updating the transaction if the status is valid
        const [result] = await connection.execute(
            'UPDATE lib_transaction SET book_title = ?, borrower = ?, phone_no = ?, return_date = ?, status = ? WHERE id = ?',
            [book_title, borrower, phone_no, return_date, status, id]
        );
        
        return result.affectedRows;
    }
    


    


}   


export default TranscModel;