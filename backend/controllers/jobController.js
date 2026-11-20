// Member B owns this file. Use the functions from ../models/job.js.
const notImplemented = (req, res) => res.status(501).json({ error: 'Not implemented yet' });

// TODO (Member B): list - return all jobs (optional: filter by ?search= and ?location=).
exports.list = notImplemented;

// TODO (Member B): get - return one job by req.params.id, or 404.
exports.get = notImplemented;

// TODO (Member B): create - save a new job (employer_id = req.user.id).
exports.create = notImplemented;

// TODO (Member B): update - change a job. Only its owner or an admin may do it
// (coordinate with Member A: req.user.id / req.user.role).
exports.update = notImplemented;

// TODO (Member B): remove - delete a job (same owner/admin rule).
exports.remove = notImplemented;
