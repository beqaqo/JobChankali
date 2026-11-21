// TODO (Member A): validation for register/login input (email format, password length, allowed roles).
function requireFields(...fields) {
    return (req, res, next) => {

        for (let field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    message: `${field} is required`
                });
            }
        }
        next();
    };
}

const validateJob = requireFields('title', 'company', 'location', 'description');
const validateApplication = requireFields('job_id');

module.exports = {
    validateJob,
    validateApplication
};
// Idea: write small middleware like requireFields('title', 'company') that returns 400 if a field is missing.
