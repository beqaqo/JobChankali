const db = require('../config/db');

const create = async (application) => {
    const [id] = await db('applications').insert(application);

    const newApplication = await db('applications')
        .where({ id: id })
        .first();

    return newApplication;
};

const listByJob = async (jobId) => {
    const applications = await db('applications')
        .where({ job_id: jobId })
        .select('*');

    return applications;
};

const listByCandidate = async (candidateId) => {
    const applications = await db('applications')
        .where({ candidate_id: candidateId })
        .select('*');

    return applications;
};

module.exports = { create, listByJob, listByCandidate };