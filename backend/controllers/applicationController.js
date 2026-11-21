const applicationModel = require('../models/application');
const jobModel = require('../models/job');

exports.submit = async (req, res) => {
    try {
        const jobId = req.body.job_id;
        if (!jobId) {
            return res.status(400).json({ error: 'Job ID is required' });
        }

        const job = await jobModel.getById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const candidateId = req.user.id;
        const applications = await applicationModel.listByCandidate(candidateId);
        const alreadyApplied = applications.some((application) => {
            return Number(application.job_id) === Number(jobId);
        });

        if (alreadyApplied) {
            return res.status(409).json({ error: 'You have already applied for this job' });
        }

        const applicationData = {
            job_id: jobId,
            candidate_id: candidateId,
            cover_letter: req.body.cover_letter || ''
        };
        const newApplication = await applicationModel.create(applicationData);
        res.status(201).json(newApplication);

    } catch (error) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
};

exports.listMine = async (req, res) => {
    try {
        const candidateId = req.user.id;
        const applications = await applicationModel.listByCandidate(candidateId);
        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get your applications' });
    }
};

exports.listForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await jobModel.getById(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const isAdmin = req.user.role === 'admin';
        const isOwner = Number(job.employer_id) === Number(req.user.id);
        if (!isAdmin && !isOwner) {
            return res.status(403).json({
                error: 'You are not allowed to view these applications'
            });
        }

        const applications = await applicationModel.listByJob(jobId);
        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({ error: 'Failed to get job applications' });
    }
};