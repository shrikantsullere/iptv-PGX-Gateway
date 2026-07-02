const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/', supportController.getTickets);
router.put('/:id', supportController.updateTicketStatus);

module.exports = router;
