const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Fetch dashboard overview
 */
const getOverview = async (req, res, next) => {
    try {
        const metrics = await prisma.dashboard_metrics.findFirst({
            orderBy: { lastUpdated: 'desc' }
        });
        return sendResponse(res, 200, true, 'Dashboard overview fetched successfully', metrics);
    } catch (error) {
        next(error);
    }
};

/**
 * Refresh dashboard data
 */
const refreshDashboard = async (req, res, next) => {
    try {
        // Mock refresh logic - in reality, this might trigger a background worker
        return sendResponse(res, 200, true, 'Dashboard refresh triggered successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch revenue chart data
 */
const getRevenueGrowth = async (req, res, next) => {
    try {
        const revenueData = await prisma.monthly_revenue_history.findMany({
            take: 12,
            orderBy: { createdAt: 'asc' }
        });
        return sendResponse(res, 200, true, 'Revenue growth fetched successfully', revenueData);
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch processor analytics
 */
const getProcessorDistribution = async (req, res, next) => {
    try {
        // Usually calculated or stored in processor metrics
        const distribution = await prisma.processor_dashboard.findMany({
            take: 10,
            orderBy: { generatedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Processor distribution fetched successfully', distribution);
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch platform health status
 */
const getSystemStatus = async (req, res, next) => {
    try {
        const monitors = await prisma.processor_monitors.findMany();
        return sendResponse(res, 200, true, 'System status fetched successfully', monitors);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOverview,
    refreshDashboard,
    getRevenueGrowth,
    getProcessorDistribution,
    getSystemStatus
};
