const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { validateJob } = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');

// Anyone can see jobs
router.get('/', jobController.list);
router.get('/:id', jobController.get);

// Only employers and admins can create, edit or delete jobs
router.post('/', authenticate, authorize('employer', 'admin'), validateJob, jobController.create);
router.put('/:id', authenticate, authorize('employer', 'admin'), validateJob, jobController.update);
router.delete('/:id', authenticate, authorize('employer', 'admin'), jobController.remove);

module.exports = router;
