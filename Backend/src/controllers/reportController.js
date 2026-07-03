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

const getMerchantReports = async (req, res, next) => {
    try {
        const { dateRange } = req.query;

        let analytics = await prisma.merchant_analytics.findMany({
            where: { merchantId: 'MER-CURRENT' },
            orderBy: { createdAt: 'asc' }
        });

        // Seed if empty
        if (analytics.length === 0) {
            const seed = [
                { merchantId: 'MER-CURRENT', month: 'Jan', volume: 4000, refunds: 240 },
                { merchantId: 'MER-CURRENT', month: 'Feb', volume: 3000, refunds: 139 },
                { merchantId: 'MER-CURRENT', month: 'Mar', volume: 2000, refunds: 980 },
                { merchantId: 'MER-CURRENT', month: 'Apr', volume: 2780, refunds: 390 },
                { merchantId: 'MER-CURRENT', month: 'May', volume: 1890, refunds: 480 },
                { merchantId: 'MER-CURRENT', month: 'Jun', volume: 2390, refunds: 380 },
                { merchantId: 'MER-CURRENT', month: 'Jul', volume: 3490, refunds: 430 }
            ];
            await prisma.merchant_analytics.createMany({ data: seed });
            analytics = await prisma.merchant_analytics.findMany({
                where: { merchantId: 'MER-CURRENT' },
                orderBy: { createdAt: 'asc' }
            });
        }

        // Apply simple filtering based on dateRange (mocking the effect)
        let dataToReturn = analytics;
        if (dateRange === 'Today' || dateRange === 'Yesterday') {
            dataToReturn = analytics.slice(-1);
        } else if (dateRange === 'Last 7 Days') {
            dataToReturn = analytics.slice(-2);
        } else if (dateRange === 'This Month') {
            dataToReturn = analytics.slice(-1);
        } // 'YTD 2026' or 'All Time' returns all

        const mappedData = dataToReturn.map(a => ({
            name: a.month,
            volume: a.volume,
            refunds: a.refunds
        }));

        return sendResponse(res, 200, true, 'Merchant reports fetched successfully', mappedData);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSystemReports,
    generateSystemReport,
    getComplianceReports,
    getReportHistory,
    getMerchantReports
};
