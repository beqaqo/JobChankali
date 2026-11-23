const router = require('express').Router();
const applicationController = require('../controllers/applicationController');
const { validateApplication } = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize('candidate'), validateApplication, applicationController.submit);
router.get('/mine', authenticate, authorize('candidate'), applicationController.listMine);
router.get('/job/:jobId', authenticate, authorize('employer', 'admin'), applicationController.listForJob);

module.exports = router;
