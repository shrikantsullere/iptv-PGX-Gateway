const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Platform Settings
router.get('/', settingsController.getPlatformSettings);
router.put('/', settingsController.updatePlatformSettings);

// Fees Configurations
router.get('/fees', settingsController.getFeeConfigurations);
router.put('/fees/:feeId', settingsController.updateFeeConfiguration);

// API Keys
router.get('/apikeys', settingsController.getApiKeys);
router.post('/apikeys', settingsController.generateApiKey);
router.put('/apikeys/:keyId/revoke', settingsController.revokeApiKey);

module.exports = router;
