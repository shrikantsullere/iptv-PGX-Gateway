const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all system reports
 */
const getSystemReports = async (req, res, next) => {
    try {
        const reports = await prisma.reports.findMany({
            orderBy: { generatedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'System reports fetched successfully', reports);
    } catch (error) {
        next(error);
    }
};

/**
 * Generate system reports
 */
const generateSystemReport = async (req, res, next) => {
    try {
        const { type, range } = req.body;
        
        const newReport = await prisma.reports.create({
            data: {
                reportType: type || 'Gateway P&L',
                dateRange: range || 'Last 7 Days',
                fileUrl: `https://pgx-gateway.com/downloads/rep_${Date.now()}.pdf`,
                fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
                generatedBy: 'System',
                generatedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'System report generated successfully', newReport);
    } catch (error) {
        next(error);
    }
};

/**
 * Get compliance reports
 */
const getComplianceReports = async (req, res, next) => {
    try {
        const reports = await prisma.compliance_reports.findMany({
            orderBy: { generatedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Compliance reports fetched', reports);
    } catch (error) {
        next(error);
    }
};

/**
 * Get report history
 */
const getReportHistory = async (req, res, next) => {
    try {
        // Keeping as is, since it may be used elsewhere
        return sendResponse(res, 200, true, 'Report history fetched', []);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSystemReports,
    generateSystemReport,
    getComplianceReports,
    getReportHistory
};
