import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

class AuthController {
    async register(req, res) {
        const { name, email, password, role } = req.body;

        try {
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({ name, email, password: hashedPassword, role });

            return res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findByEmail(email);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                { email: user.email, role: user.role, id: user.id }, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ token, user: { email: user.email, role: user.role, name: user.name } });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

export default new AuthController();
