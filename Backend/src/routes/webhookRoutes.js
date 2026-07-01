const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Developer'])); // Added Developer role since it's common for webhooks

// Webhooks
router.get('/', webhookController.getWebhooks);
router.post('/:id/test', webhookController.testWebhook);
router.get('/logs', webhookController.getWebhookLogs);

// Notifications
router.get('/notifications', webhookController.getNotifications);
router.put('/notifications/:templateId', webhookController.updateNotification);

module.exports = router;
