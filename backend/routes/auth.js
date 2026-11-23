// Member A owns this file.
const router = require('express').Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', authenticate, authController.me);

// Admin only: list all users
router.get('/users', authenticate, authorize('admin'), authController.listUsers);

module.exports = router;
