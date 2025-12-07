import User from "./models/User.js";
import Role from './models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь уже существует' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();

            // Генерация токена
            const token = generateAccessToken(user._id, user.roles);

            // Ставим токен в HttpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // true в проде (HTTPS)
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
            });

            return res.json({ message: "Пользователь успешно зарегистрирован", user: { id: user._id, username: user.username } });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Registration failed" });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const token = generateAccessToken(user._id, user.roles);

            // Ставим токен в HttpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ message: "Успешный вход", user: { id: user._id, username: user.username } });

        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Login failed" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Ошибка получения пользователей" });
        }
    }
}

export default new authController();
