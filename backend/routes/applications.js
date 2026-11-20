const router = require('express').Router();
const applicationController = require('../controllers/applicationController');
// const { authenticate, authorize } = require('../middleware/auth');

// TODO (Member A): protect each route with authenticate + authorize:
//   submit -> 'candidate' only | listMine -> 'candidate' only | listForJob -> 'employer', 'admin'
router.post('/', applicationController.submit);
router.get('/mine', applicationController.listMine);
router.get('/job/:jobId', applicationController.listForJob);

module.exports = router;
