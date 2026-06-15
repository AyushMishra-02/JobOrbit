const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getApplications, createApplication,
  updateApplication, deleteApplication, getStats
} = require('../controllers/applicationController');

const router = express.Router();

router.route('/')
  .get(protect, getApplications)
  .post(protect, createApplication);

router.route('/:id')
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

router.get('/stats/summary', protect, getStats);

module.exports = router;
