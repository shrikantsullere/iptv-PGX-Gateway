const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/', auditLogController.getAuditLogs);

module.exports = router;
