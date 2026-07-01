const express = require('express');
const router = express.Router();
const processorController = require('../controllers/processorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Dashboard Routes
router.get('/dashboard', processorController.getDashboardSummary);
router.get('/health', processorController.getProcessorHealth);
router.get('/nodes', processorController.getProcessingNodes);
router.get('/volume', processorController.getVolumeAnalytics);
router.get('/alerts', processorController.getAlerts);
router.post('/configure-node', processorController.configureNode);
router.get('/report', processorController.downloadReport);

// Failover Monitor Routes
router.get('/failover-monitor', processorController.getFailoverMonitor);
router.get('/failover-monitor/nodes', processorController.getProcessingNodes); // Resuing nodes logic
router.get('/failover-monitor/events', processorController.getFailoverEvents);
router.get('/failover-monitor/triggers', processorController.getFailoverTriggers);
router.put('/failover-monitor/triggers/:id', processorController.updateTriggerSettings);
router.post('/failover-monitor/manual-failover', processorController.triggerManualFailover);
router.post('/failover-monitor/recovery', processorController.triggerRecovery);

module.exports = router;
