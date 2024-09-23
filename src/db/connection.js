import mysql from 'mysql2/promise';
import "dotenv/config";

const connection = mysql.createPool({
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_DATABASE,
    port: process.env.LOCAL_DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function testConnection() {
    try {
        await connection.query('SELECT 1'); // Simple query to test connection
        console.log("MySQL Database connected successfully!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

export default connection;
