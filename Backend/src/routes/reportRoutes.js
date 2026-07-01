const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.post('/system', reportController.generateSystemReport);
router.get('/compliance', reportController.getComplianceReports);
router.get('/history', reportController.getReportHistory);

module.exports = router;
