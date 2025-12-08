export default function roleMiddleware(requiredRoles = []) {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') return next();

        try {
            const userRoles = req.user?.roles;
            if (!userRoles) {
                return res.status(403).json({ message: 'Пользователь не авторизован' });
            }

            const hasRole = userRoles.some(role => requiredRoles.includes(role));
            if (!hasRole) {
                return res.status(403).json({ message: 'У вас нет доступа' });
            }

            next();
        } catch (e) {
            console.error('Role middleware error:', e);
            return res.status(403).json({ message: 'Пользователь не авторизован' });
        }
    };
}
