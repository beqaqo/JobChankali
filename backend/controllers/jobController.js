const jobModel = require('../models/job');

exports.list = async (req, res) => {
    try {
        const jobs = await jobModel.getAll();
        res.status(200).json(jobs);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get jobs' });
    }
};

exports.get = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await jobModel.getById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get job' });
    }
};

exports.create = async (req, res) => {
    try {
        const jobData = {
            ...req.body,
            employer_id: req.user.id
        };
        const newJob = await jobModel.create(jobData);
        res.status(201).json(newJob);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await jobModel.getById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = Number(job.employer_id) === Number(req.user.id);

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ error: 'You are not allowed to update this job' });
        }

        const updatedJob = await jobModel.update(id, req.body);
        res.status(200).json(updatedJob);

    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const job = await jobModel.getById(id);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = Number(job.employer_id) === Number(req.user.id);

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ error: 'You are not allowed to delete this job' });
        }

        await jobModel.remove(id);
        res.status(200).json({ message: 'Job deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
};