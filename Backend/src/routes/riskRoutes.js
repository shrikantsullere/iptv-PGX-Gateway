const express = require('express');
const router = express.Router();
const riskController = require('../controllers/riskController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Risk Manager', 'Owner']));

// Fraud Routes
router.get('/fraud/alerts', riskController.getFraudAlerts);
router.put('/fraud/alerts/:id/resolve', riskController.resolveFraudAlert);
router.post('/fraud/investigations', riskController.triggerInvestigation);

// Risk Incidents
router.get('/incidents', riskController.getRiskIncidents);
router.post('/incidents', riskController.createRiskIncident);

// Blocked Entities & Policies
router.get('/blocked-entities', riskController.getBlockedEntities);
router.put('/blocked-entities/:entityId/unblock', riskController.unblockEntity);
router.get('/policies', riskController.getBlockPolicies);
router.put('/policies/:policyId', riskController.updateBlockPolicy);

module.exports = router;
