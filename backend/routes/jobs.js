const router = require('express').Router();
const jobController = require('../controllers/jobController');
const { validateJob } = require('../middleware/validate');
// const { authenticate, authorize } = require('../middleware/auth');

router.get('/', jobController.list);
router.get('/:id', jobController.get);

// TODO (Member A): protect the three routes below with
//   authenticate and authorize('employer', 'admin')
router.post('/', validateJob, jobController.create);
router.put('/:id', validateJob, jobController.update);
router.delete('/:id', jobController.remove);

module.exports = router;