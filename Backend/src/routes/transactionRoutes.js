const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

// Search, Filter, Export, Stats must come before /:id routes
router.get('/search', transactionController.searchTransactions);
router.get('/filter', transactionController.filterTransactions);
router.get('/export', transactionController.exportTransactions);
router.get('/stats', transactionController.getTransactionStats);

router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);
router.post('/refund/:id', transactionController.refundTransaction);

module.exports = router;
