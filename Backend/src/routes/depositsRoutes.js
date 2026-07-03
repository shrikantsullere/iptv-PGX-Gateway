const express = require('express');
const router = express.Router();
const depositsController = require('../controllers/depositsController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', depositsController.getDeposits);

module.exports = router;
