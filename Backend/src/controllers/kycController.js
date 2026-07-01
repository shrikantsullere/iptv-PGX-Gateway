const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all KYC submissions
 */
const getKycSubmissions = async (req, res, next) => {
    try {
        const submissions = await prisma.kyc_submissions.findMany({
            orderBy: { submittedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'KYC submissions fetched', submissions);
    } catch (error) {
        next(error);
    }
};

/**
 * Get KYC submission details
 */
const getKycDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const submission = await prisma.kyc_submissions.findUnique({
            where: { submissionId: id }
        });
        
        if (!submission) return sendResponse(res, 404, false, 'KYC submission not found');
        return sendResponse(res, 200, true, 'KYC details fetched', submission);
    } catch (error) {
        next(error);
    }
};

/**
 * Upload KYC document (Mock logic)
 */
const uploadDocument = async (req, res, next) => {
    try {
        const { merchantId, documentType } = req.body;
        
        if (!merchantId || !documentType) {
            return sendResponse(res, 400, false, 'merchantId and documentType are required');
        }

        // Mocking file upload response
        const mockDocumentUrl = `https://pgx-mock-storage.s3.amazonaws.com/${merchantId}/${documentType}_${Date.now()}.pdf`;

        const document = await prisma.kyc_documents.create({
            data: {
                merchantId,
                documentType,
                documentUrl: mockDocumentUrl,
                status: 'Pending',
                uploadedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Document uploaded successfully', document);
    } catch (error) {
        next(error);
    }
};

/**
 * Update KYC document status
 */
const updateDocumentStatus = async (req, res, next) => {
    try {
        const { documentId } = req.params;
        const { status, remarks } = req.body;

        const updated = await prisma.kyc_documents.update({
            where: { documentId },
            data: { status, remarks }
        });

        return sendResponse(res, 200, true, 'Document status updated', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Create/Add KYC review
 */
const addKycReview = async (req, res, next) => {
    try {
        const { submissionId } = req.params;
        const { reviewerId, decision, comments } = req.body;

        const review = await prisma.kyc_reviews.create({
            data: {
                submissionId,
                reviewerId,
                decision,
                comments,
                reviewedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'KYC review added successfully', review);
    } catch (error) {
        next(error);
    }
};

/**
 * Get AML alerts
 */
const getAmlAlerts = async (req, res, next) => {
    try {
        const alerts = await prisma.aml_alerts.findMany({
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'AML alerts fetched', alerts);
    } catch (error) {
        next(error);
    }
};

/**
 * Resolve AML alert
 */
const resolveAmlAlert = async (req, res, next) => {
    try {
        const { alertId } = req.params;
        const { status, resolutionNotes } = req.body;

        const updated = await prisma.aml_alerts.update({
            where: { alertId },
            data: { status, resolutionNotes }
        });

        return sendResponse(res, 200, true, 'AML alert resolved', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Create AML investigation
 */
const createAmlInvestigation = async (req, res, next) => {
    try {
        const payload = req.body;
        
        const investigation = await prisma.aml_investigations.create({
            data: {
                ...payload,
                status: 'Open',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'AML investigation created', investigation);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getKycSubmissions,
    getKycDetails,
    uploadDocument,
    updateDocumentStatus,
    addKycReview,
    getAmlAlerts,
    resolveAmlAlert,
    createAmlInvestigation
};
