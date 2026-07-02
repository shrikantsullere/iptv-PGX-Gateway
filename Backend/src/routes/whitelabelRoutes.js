const express = require('express');
const router = express.Router();
const whitelabelController = require('../controllers/whitelabelController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/', whitelabelController.getRequests);
router.put('/:id/approve', whitelabelController.approveRequest);
router.put('/:id/reject', whitelabelController.rejectRequest);

module.exports = router;
