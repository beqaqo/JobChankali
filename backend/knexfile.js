module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/database.sqlite'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};