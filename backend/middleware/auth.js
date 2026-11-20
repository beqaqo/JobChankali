// TODO (Member A): implement both functions below.
//
// authenticate: read the JWT from the "Authorization: Bearer <token>" header,
//   verify it, set req.user = { id, role }, call next(). If invalid -> 401.
// authorize(...roles): allow only listed roles, e.g. authorize('employer', 'admin'). Otherwise -> 403.
//
// For now they just let every request through so other members can keep working.

exports.authenticate = (req, res, next) => next();

exports.authorize = (...roles) => (req, res, next) => next();
