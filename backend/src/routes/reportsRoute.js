const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportsController.js');

router.get('/', reportController.getReports);
router.post('/', reportController.createReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;