const router = require('express').Router();
const jobController = require('../controllers/jobController');
// const { authenticate, authorize } = require('../middleware/auth');

// Public routes (Member B)
router.get('/', jobController.list);
router.get('/:id', jobController.get);

// TODO (Member A): protect the three routes below with
//   authenticate and authorize('employer', 'admin')
// TODO (Member B): add input validation to create and update.
router.post('/', jobController.create);
router.put('/:id', jobController.update);
router.delete('/:id', jobController.remove);

module.exports = router;
