const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/overview', revenueController.getRevenueOverview);
router.get('/growth', revenueController.getRevenueGrowth);
router.get('/sources', revenueController.getRevenueSources);
router.get('/export', revenueController.exportRevenue);
router.get('/monthly', revenueController.getMonthlyRevenue);
router.get('/yearly', revenueController.getYearlyRevenue);
router.get('/', revenueController.getRevenueDashboard);

module.exports = router;
