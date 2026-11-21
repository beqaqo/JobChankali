const db = require('../config/db');

const getAll = async () => {
    const jobs = await db('jobs').select('*');
    return jobs;
};

const getById = async (id) => {
    const job = await db('jobs')
        .where({ id: id })
        .first();

    return job;
};

const create = async (job) => {
    const [id] = await db('jobs').insert(job);
    return getById(id);
};

const update = async (id, fields) => {
    await db('jobs')
        .where({ id: id })
        .update(fields);

    return getById(id);
};

const remove = async (id) => {
    const deletedRows = await db('jobs')
        .where({ id: id })
        .del();

    return deletedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };