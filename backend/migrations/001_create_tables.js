exports.up = async (knex) => {

    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.string('role').notNullable().defaultTo('candidate');
    });

    await knex.schema.createTable('jobs', (table) => {
        table.increments('id').primary();
        table.integer('employer_id').unsigned().notNullable();
        table.string('title').notNullable();
        table.string('company').notNullable();
        table.string('location').notNullable();
        table.text('description').notNullable();

        table.foreign('employer_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
    });

    await knex.schema.createTable('applications', (table) => {
        table.increments('id').primary();
        table.integer('job_id').unsigned().notNullable();
        table.integer('candidate_id').unsigned().notNullable();
        table.text('cover_letter');

        table.foreign('job_id')
            .references('id')
            .inTable('jobs')
            .onDelete('CASCADE');

        table.foreign('candidate_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
    });

};


// Rollback migration
exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('applications');
    await knex.schema.dropTableIfExists('jobs');
    await knex.schema.dropTableIfExists('users');
};
