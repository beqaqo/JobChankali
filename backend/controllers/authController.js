// Member A owns this file.
const notImplemented = (req, res) => res.status(501).json({ error: 'Not implemented yet' });

// TODO (Member A): register - check email is unused, hash password (bcryptjs),
//   save user (only 'employer' or 'candidate' allowed as role), return { user, token }.
exports.register = notImplemented;

// TODO (Member A): login - find user by email, compare password, return { user, token } (JWT).
exports.login = notImplemented;

// TODO (Member A): me - return the currently logged-in user (uses req.user from authenticate).
exports.me = notImplemented;
