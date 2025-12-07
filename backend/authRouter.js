import { Router } from 'express';
import controller from './authController.js';
import { check } from 'express-validator';
import roleMiddleware from './middleware/roleMiddleware.js';
import authMiddleware from './middleware/authMiddleware.js';
import User from './models/User.js';

const router = Router();

router.post(
    '/register',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть 4–25 символов').isLength({ min: 4, max: 25 }),
    ],
    controller.registration
);

router.post('/login', controller.login);

router.get('/check', authMiddleware, async (req, res) => {
    try {
        const userFromDb = await User.findById(req.user.id).select('-password');
        if (!userFromDb) return res.status(404).json({ loggedIn: false });
        return res.json({ loggedIn: true, user: userFromDb });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users', authMiddleware, roleMiddleware(['ADMIN']), controller.getUsers);

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Вы вышли' });
});

export default router;
