import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') return next();

    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Пользователь не авторизован' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (e) {
        console.error('Auth middleware error:', e);
        return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
}
