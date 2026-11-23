// Member A owns this file.
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const { createToken } = require('../middleware/auth');

// Removes the password hash before sending a user to the frontend.
function safeUser(user) {
    return { id: user.id, name: user.name, email: user.email, role: user.role };
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'This email is already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name: name,
            email: email,
            password_hash: passwordHash,
            role: role
        });

        res.status(201).json({ user: safeUser(user), token: createToken(user) });

    } catch (error) {
        res.status(500).json({ error: 'Failed to register' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Wrong email or password' });
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password_hash);
        if (!passwordIsCorrect) {
            return res.status(401).json({ error: 'Wrong email or password' });
        }

        res.status(200).json({ user: safeUser(user), token: createToken(user) });

    } catch (error) {
        res.status(500).json({ error: 'Failed to log in' });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(safeUser(user));

    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
};

// Admin only: list all users.
exports.listUsers = async (req, res) => {
    try {
        const users = await userModel.list();
        res.status(200).json(users.map(safeUser));

    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};
