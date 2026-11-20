// Member A owns this file.
const router = require('express').Router();
const authController = require('../controllers/authController');

// TODO (Member A): add validation middleware (from ../middleware/validate) to register and login.
router.post('/register', authController.register);
router.post('/login', authController.login);

// TODO (Member A): protect this route with authenticate.
router.get('/me', authController.me);

// TODO (Member A, optional): admin-only route to list/delete users.

module.exports = router;
