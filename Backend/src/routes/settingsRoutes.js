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

// Fees Configurations (Old)
router.get('/fees', settingsController.getFeeConfigurations);
router.put('/fees/:feeId', settingsController.updateFeeConfiguration);

// Gateway Fees
router.get('/gateway-fees', settingsController.getGatewayFees);
router.put('/gateway-fees', settingsController.updateGatewayFees);

// Processor Fees
router.get('/processor-fees', settingsController.getProcessorFees);
router.put('/processor-fees', settingsController.updateProcessorFees);

// Fee Rules
router.post('/fee-rules', settingsController.createFeeRule);

// Subscriptions
router.get('/subscriptions', settingsController.getSubscriptions);
router.post('/subscriptions', settingsController.createSubscription);
router.put('/subscriptions/:id', settingsController.updateSubscription);
router.delete('/subscriptions/:id', settingsController.deleteSubscription);

// Countries
router.get('/countries', settingsController.getCountries);
router.post('/countries', settingsController.createCountry);
router.put('/countries/:id', settingsController.updateCountry);
router.delete('/countries/:id', settingsController.deleteCountry);

// Currencies
router.get('/currencies', settingsController.getCurrencies);
router.post('/currencies', settingsController.createCurrency);
router.put('/currencies/:id', settingsController.updateCurrency);
router.delete('/currencies/:id', settingsController.deleteCurrency);

// API Keys
router.get('/apikeys', settingsController.getApiKeys);
router.post('/apikeys', settingsController.generateApiKey);
router.put('/apikeys/:keyId/revoke', settingsController.revokeApiKey);

// Webhooks
router.get('/webhooks', settingsController.getWebhooks);
router.post('/webhooks', settingsController.createWebhook);
router.get('/webhooks/deliveries', settingsController.getWebhookDeliveries);

module.exports = router;
