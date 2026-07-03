const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);
// Allow merchant access
router.get('/', reportController.getMerchantReports);

module.exports = router;
