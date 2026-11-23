const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret';

// Makes a login token that holds the user's id and role. Valid for 7 days.
exports.createToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
};

// Checks the "Authorization: Bearer <token>" header and sets req.user = { id, role }.
exports.authenticate = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Please log in' });
    }

    try {
        const data = jwt.verify(token, SECRET);
        req.user = { id: data.id, role: data.role };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

// Lets only the listed roles through, e.g. authorize('employer', 'admin').
// Use it after authenticate.
exports.authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'You do not have access to this' });
    }
    next();
};
