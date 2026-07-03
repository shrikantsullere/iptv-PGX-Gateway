const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);
// We might not use requireRole here, or we can use it to restrict, but for now we'll just allow it

router.get('/', customerController.getCustomers);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
