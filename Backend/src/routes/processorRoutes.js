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

const feeSplitController = require('../controllers/feeSplitController');

// Failover Monitor Routes
router.get('/failover-monitor', processorController.getFailoverMonitor);
router.get('/failover-monitor/nodes', processorController.getProcessingNodes); // Resuing nodes logic
router.get('/failover-monitor/events', processorController.getFailoverEvents);
router.get('/failover-monitor/triggers', processorController.getFailoverTriggers);
router.put('/failover-monitor/triggers/:id', processorController.updateTriggerSettings);
router.post('/failover-monitor/manual-failover', processorController.triggerManualFailover);
router.post('/failover-monitor/recovery', processorController.triggerRecovery);
router.get('/failover-monitor/logs', processorController.getFailoverLogs);
router.get('/failover-monitor/alert-settings', processorController.getAlertSettings);
router.put('/failover-monitor/alert-settings', processorController.updateAlertSettings);

// Fee Split Routes
router.get('/fee-split', feeSplitController.getFeeSplit);
router.post('/fee-split/rules', feeSplitController.createMarkupRule);
router.put('/fee-split/rules/:id', feeSplitController.updateMarkupRule);

// Geo Routing Routes
router.get('/geo-routing/rules', processorController.getGeoRoutingRules);
router.post('/geo-routing/rules', processorController.createGeoRoutingRule);
router.put('/geo-routing/rules/:id', processorController.updateGeoRoutingRule);
router.delete('/geo-routing/rules/:id', processorController.deleteGeoRoutingRule);

// Merchant Fee Rules Routes
router.get('/merchant-fees', processorController.getMerchantFees);
router.put('/merchant-fees/:merchantId', processorController.overrideMerchantFee);

// Merchant Fee Rules Routes
router.get('/merchant-rules', processorController.getMerchantRules);
router.put('/merchant-rules/:id', processorController.updateMerchantRule);

// Settlement Engine Routes
router.get('/settlement-engine', processorController.getSettlementEngineData);
router.post('/settlement-engine/settle', processorController.initiateSettlement);
router.put('/settlement-engine/auto-settle', processorController.updateAutoSettleRules);

// Revenue Wallet Routes
router.get('/revenue-wallet', processorController.getRevenueWalletData);
router.post('/revenue-wallet/withdraw', processorController.withdrawRevenue);

module.exports = router;
