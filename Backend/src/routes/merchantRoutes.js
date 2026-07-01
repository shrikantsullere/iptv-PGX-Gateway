const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Search & Export routes MUST come before /:id routes
// router.get('/export', merchantController.exportMerchants); // Export not implemented in refactor yet

router.get('/', merchantController.getMerchants);
router.get('/:id', merchantController.getMerchantById);
router.post('/', merchantController.createMerchant);
router.put('/:id', merchantController.updateMerchant);
router.patch('/:id/status', merchantController.changeMerchantStatus);
router.delete('/:id', merchantController.deleteMerchant);

module.exports = router;
