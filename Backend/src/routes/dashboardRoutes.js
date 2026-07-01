const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

// Apply Auth Middleware to all dashboard routes
router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Dashboard Routes
router.get('/', dashboardController.getOverview);
router.get('/overview', dashboardController.getOverview);
router.post('/refresh', dashboardController.refreshDashboard);
router.get('/revenue-growth', dashboardController.getRevenueGrowth);
router.get('/processor-distribution', dashboardController.getProcessorDistribution);
router.get('/system-status', dashboardController.getSystemStatus);

module.exports = router;
