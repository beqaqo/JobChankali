// Member B owns this file. Use the functions from ../models/application.js.
const notImplemented = (req, res) => res.status(501).json({ error: 'Not implemented yet' });

// TODO (Member B): submit - save an application (job_id, cover_letter) for req.user.id.
//   Reject duplicates (same candidate, same job).
exports.submit = notImplemented;

// TODO (Member B): listMine - applications of the logged-in candidate.
exports.listMine = notImplemented;

// TODO (Member B): listForJob - applications for one job (only that job's employer or an admin).
exports.listForJob = notImplemented;
