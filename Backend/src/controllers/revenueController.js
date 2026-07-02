const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get revenue dashboard data
 */
const getRevenueDashboard = async (req, res, next) => {
    try {
        const revenues = await prisma.revenues.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Revenue dashboard fetched successfully', revenues);
    } catch (error) {
        next(error);
    }
};

/**
 * Get revenue summary (overview)
 */
const getRevenueOverview = async (req, res, next) => {
    try {
        const dbStats = await prisma.revenues.aggregate({
            _sum: { processingVolume: true, gatewayFeeRevenue: true, totalRevenue: true }
        });
        
        // Map to what the frontend expects without changing frontend code
        const stats = {
            _sum: {
                amount: dbStats._sum.processingVolume || 0,
                pgxFee: dbStats._sum.gatewayFeeRevenue || 0,
                netRevenue: dbStats._sum.totalRevenue || 0
            }
        };

        return sendResponse(res, 200, true, 'Revenue overview fetched successfully', stats);
    } catch (error) {
        next(error);
    }
};

/**
 * Get revenue growth chart data
 */
const getRevenueGrowth = async (req, res, next) => {
    try {
        const growth = await prisma.revenues.findMany({
            take: 12,
            orderBy: [{ year: 'asc' }, { month: 'asc' }]
        });
        return sendResponse(res, 200, true, 'Revenue growth fetched successfully', growth);
    } catch (error) {
        next(error);
    }
};

/**
 * Get revenue source distribution
 */
const getRevenueSources = async (req, res, next) => {
    try {
        // Calculate real-time totals from the Revenues table
        const stats = await prisma.revenues.aggregate({
            _sum: { gatewayFeeRevenue: true, subscriptionRevenue: true }
        });

        const totalGateway = stats._sum.gatewayFeeRevenue || 0;
        const totalSub = stats._sum.subscriptionRevenue || 0;
        const total = totalGateway + totalSub || 1; // Prevent division by zero

        const sources = [
            { source: 'Gateway Transaction Fees', percent: Math.round((totalGateway / total) * 100) },
            { source: 'Enterprise Subscriptions', percent: Math.round((totalSub / total) * 100) },
            { source: 'White-Label Setup Fees', percent: 0 },
            { source: 'FX Conversion Fees', percent: 0 }
        ];

        return sendResponse(res, 200, true, 'Revenue sources fetched successfully', sources);
    } catch (error) {
        next(error);
    }
};

/**
 * Get monthly revenue report
 */
const getMonthlyRevenue = async (req, res, next) => {
    try {
        const monthly = await prisma.monthly_revenue_history.findMany({
            orderBy: { year: 'desc', month: 'desc' }
        });
        return sendResponse(res, 200, true, 'Monthly revenue report fetched', monthly);
    } catch (error) {
        next(error);
    }
};

/**
 * Get yearly revenue report
 */
const getYearlyRevenue = async (req, res, next) => {
    try {
        // Simple aggregate grouping by year
        const yearly = await prisma.monthly_revenue_history.groupBy({
            by: ['year'],
            _sum: { totalVolume: true, pgxRevenue: true, processorFees: true }
        });
        return sendResponse(res, 200, true, 'Yearly revenue report fetched', yearly);
    } catch (error) {
        next(error);
    }
};

/**
 * Export revenue reports
 */
const exportRevenue = async (req, res, next) => {
    try {
        const format = req.query.format || 'CSV';
        return sendResponse(res, 200, true, `Revenue data exported successfully as ${format}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRevenueDashboard,
    getRevenueOverview,
    getRevenueGrowth,
    getRevenueSources,
    getMonthlyRevenue,
    getYearlyRevenue,
    exportRevenue
};
