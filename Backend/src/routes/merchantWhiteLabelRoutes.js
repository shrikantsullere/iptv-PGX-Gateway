const express = require('express');
const router = express.Router();
const merchantWhiteLabelController = require('../controllers/merchantWhiteLabelController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Merchant', 'Owner'])); // Assuming merchants have these roles

router.get('/', merchantWhiteLabelController.getSettings);
router.put('/', merchantWhiteLabelController.updateSettings);

module.exports = router;
