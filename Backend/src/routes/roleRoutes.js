const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Owner']));

router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.put('/:roleId', roleController.updateRole);
router.delete('/:roleId', roleController.deleteRole);

module.exports = router;
