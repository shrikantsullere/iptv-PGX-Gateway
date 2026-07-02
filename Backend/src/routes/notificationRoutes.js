const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/', notificationController.getBroadcasts);
router.post('/', notificationController.createBroadcast);

module.exports = router;
