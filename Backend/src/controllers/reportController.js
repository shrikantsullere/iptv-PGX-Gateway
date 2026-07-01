const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Generate system reports
 */
const generateSystemReport = async (req, res, next) => {
    try {
        const { reportType, dateRange } = req.body;
        // Mocking generation
        const mockReportData = {
            reportId: `sys_rep_${Date.now()}`,
            reportType,
            dateRange,
            status: 'Generated',
            downloadUrl: `https://pgx-mock-storage.s3.amazonaws.com/reports/sys_${Date.now()}.pdf`
        };

        return sendResponse(res, 201, true, 'System report generated successfully', mockReportData);
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
        // Just mocking report history using an empty array for now since we don't have a specific table for all reports history.
        return sendResponse(res, 200, true, 'Report history fetched', []);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateSystemReport,
    getComplianceReports,
    getReportHistory
};
