const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await knex('users').insert({
        name: 'Admin',
        email: 'admin@gmail.com',
        password_hash: passwordHash,
        role: 'admin'
    });
};