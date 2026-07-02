const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all audit logs
 */
const getAuditLogs = async (req, res, next) => {
    try {
        const logs = await prisma.audit_logs.findMany({
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'Audit logs fetched', logs);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAuditLogs
};
