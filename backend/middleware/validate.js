// Returns 400 if one of the fields is missing from the request body.
function requireFields(...fields) {
    return (req, res, next) => {
        for (let field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }
        next();
    };
}

const validateJob = requireFields('title', 'company', 'location', 'description');
const validateApplication = requireFields('job_id');

// Checks the email format. Used after requireFields, so email is not empty.
function checkEmail(req, res, next) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(req.body.email)) {
        return res.status(400).json({ error: 'Email is not valid' });
    }
    next();
}

// Extra checks for register: password length and role.
function checkRegister(req, res, next) {
    if (req.body.password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    if (req.body.role !== 'employer' && req.body.role !== 'candidate') {
        return res.status(400).json({ error: 'Role must be employer or candidate' });
    }
    next();
}

const validateRegister = [requireFields('name', 'email', 'password', 'role'), checkEmail, checkRegister];
const validateLogin = [requireFields('email', 'password'), checkEmail];

module.exports = {
    validateJob,
    validateApplication,
    validateRegister,
    validateLogin
};
