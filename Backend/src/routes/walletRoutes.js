const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/liquidity', walletController.getLiquidity);
router.get('/treasury', walletController.getTreasury);
router.post('/transfer', walletController.transferFunds);
router.get('/export', walletController.exportWallets);

router.get('/', walletController.getAllWallets);
router.get('/:id', walletController.getWalletById);
router.post('/', walletController.createWallet);
router.put('/:id', walletController.updateWallet);

module.exports = router;
