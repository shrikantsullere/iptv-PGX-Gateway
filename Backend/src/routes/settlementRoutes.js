const express = require('express');
const router = express.Router();
const settlementController = require('../controllers/settlementController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Non-ID routes must come first
router.get('/queue', settlementController.getSettlementQueue);
router.get('/analytics', settlementController.getSettlementAnalytics);
router.get('/export', settlementController.exportSettlements);
router.get('/linked-accounts', settlementController.getLinkedAccounts);
router.post('/linked-accounts', settlementController.addLinkedAccount);

router.get('/', settlementController.getAllSettlements);
router.get('/:id', settlementController.getSettlementById);
router.post('/', settlementController.createSettlement);
router.patch('/:id/status', settlementController.updateSettlementStatus);

module.exports = router;
