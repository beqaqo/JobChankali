const db = require('../config/db');

const findByEmail = async (email) => {
    const user = await db('users')
        .where({ email: email })
        .first();

    return user;
};

const findById = async (id) => {
    const user = await db('users')
        .where({ id: id })
        .first();

    return user;
};

const create = async (user) => {
    const [id] = await db('users').insert(user);

    return findById(id);
};

const list = async () => {
    const users = await db('users').select('*');

    return users;
};

module.exports = { findByEmail, findById, create, list };