const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);
// Allow merchant access
router.get('/', webhookController.getMerchantWebhooks);
router.post('/', webhookController.createMerchantWebhook);
router.put('/:id', webhookController.updateMerchantWebhook);
router.delete('/:id', webhookController.deleteMerchantWebhook);

module.exports = router;
