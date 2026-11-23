const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
    // Don't add the admin twice if the seed is run again
    const existingAdmin = await knex('users').where({ email: 'admin@gmail.com' }).first();
    if (existingAdmin) {
        return;
    }

    const passwordHash = await bcrypt.hash('admin123', 10);

    await knex('users').insert({
        name: 'Admin',
        email: 'admin@gmail.com',
        password_hash: passwordHash,
        role: 'admin'
    });
};