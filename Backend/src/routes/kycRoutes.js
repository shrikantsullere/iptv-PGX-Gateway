const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { requireRole } = require('../middlewares/roleMiddleware');

router.use(verifyToken);
router.use(requireRole(['Super Admin', 'Compliance Officer', 'Owner']));

// KYC Submissions & Documents
router.get('/submissions', kycController.getKycSubmissions);
router.get('/submissions/:id', kycController.getKycDetails);
router.post('/documents/upload', kycController.uploadDocument);
router.put('/documents/:documentId/status', kycController.updateDocumentStatus);
router.post('/submissions/:submissionId/review', kycController.addKycReview);

// AML Endpoints (often grouped with KYC)
router.get('/aml/alerts', kycController.getAmlAlerts);
router.put('/aml/alerts/:alertId/resolve', kycController.resolveAmlAlert);
router.post('/aml/investigations', kycController.createAmlInvestigation);

module.exports = router;
