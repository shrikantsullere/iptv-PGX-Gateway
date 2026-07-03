const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);
// Allow merchant access
router.get('/', revenueController.getMerchantRevenue);

module.exports = router;
