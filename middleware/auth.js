import jwt from 'jsonwebtoken';

const auth = (role) => (req, res, next) => {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'mysecretkey'); 
        req.user = decoded;

        if (role && req.user.role !== role) {
            return res.status(403).send('Access denied. Incorrect role.');
        }

        next();
    } catch (err) {
        return res.status(400).send('Invalid token.');
    }
};

export default auth;
