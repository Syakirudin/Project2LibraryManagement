import connection from '../db/connection.js';

class UserModel {
    async create({ name, email, password, role }) {
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return result;
    }

    async findByEmail(email) {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; // return the first user found
    }
}

// Create a singleton instance of UserModel
export default new UserModel();

