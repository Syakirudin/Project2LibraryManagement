
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_DATABASE,
    port: process.env.LOCAL_DB_PORT
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});



export default connection;
