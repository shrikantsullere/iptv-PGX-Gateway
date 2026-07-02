const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all white-label requests
 */
const getRequests = async (req, res, next) => {
    try {
        const requests = await prisma.white_label_requests.findMany({
            orderBy: { requestedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'White-label requests fetched', requests);
    } catch (error) {
        next(error);
    }
};

/**
 * Approve request
 */
const approveRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await prisma.white_label_requests.update({
            where: { requestId: id },
            data: { approvalStatus: 'APPROVED', sslStatus: 'Active' }
        });
        return sendResponse(res, 200, true, 'White-label request approved', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Reject request
 */
const rejectRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await prisma.white_label_requests.update({
            where: { requestId: id },
            data: { approvalStatus: 'REJECTED', sslStatus: 'Failed' }
        });
        return sendResponse(res, 200, true, 'White-label request rejected', updated);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRequests,
    approveRequest,
    rejectRequest
};
