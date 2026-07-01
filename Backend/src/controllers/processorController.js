const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get dashboard summary
 */
const getDashboardSummary = async (req, res, next) => {
    try {
        const summary = await prisma.processor_dashboard.findMany({
            take: 1,
            orderBy: { generatedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Processor dashboard summary fetched', summary[0] || {});
    } catch (error) {
        next(error);
    }
};

/**
 * Get processor health data
 */
const getProcessorHealth = async (req, res, next) => {
    try {
        const health = await prisma.processor_monitors.findMany();
        return sendResponse(res, 200, true, 'Processor health fetched', health);
    } catch (error) {
        next(error);
    }
};

/**
 * Get active processing nodes
 */
const getProcessingNodes = async (req, res, next) => {
    try {
        // Mock query for nodes, could be fetched from processor_monitors or a specific nodes table
        const nodes = await prisma.processor_monitors.findMany({
            where: { isHealthy: true }
        });
        return sendResponse(res, 200, true, 'Active nodes fetched', nodes);
    } catch (error) {
        next(error);
    }
};

/**
 * Get live volume analytics
 */
const getVolumeAnalytics = async (req, res, next) => {
    try {
        const volume = await prisma.processor_metrics.findMany({
            take: 24,
            orderBy: { generatedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Live volume analytics fetched', volume);
    } catch (error) {
        next(error);
    }
};

/**
 * Get critical alerts
 */
const getAlerts = async (req, res, next) => {
    try {
        const alerts = await prisma.failover_events.findMany({
            where: { status: 'Triggered' },
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'Critical alerts fetched', alerts);
    } catch (error) {
        next(error);
    }
};

/**
 * Configure processing node
 */
const configureNode = async (req, res, next) => {
    try {
        const payload = req.body;
        // Mock node configuration
        return sendResponse(res, 200, true, 'Node configured successfully', payload);
    } catch (error) {
        next(error);
    }
};

/**
 * Download processor report
 */
const downloadReport = async (req, res, next) => {
    try {
        return sendResponse(res, 200, true, 'Report downloaded successfully as PDF');
    } catch (error) {
        next(error);
    }
};

/**
 * FAILOVER MONITOR ENDPOINTS
 */

const getFailoverMonitor = async (req, res, next) => {
    try {
        const overview = await prisma.processor_monitors.findMany();
        return sendResponse(res, 200, true, 'Failover monitor overview fetched', overview);
    } catch (error) {
        next(error);
    }
};

const getFailoverEvents = async (req, res, next) => {
    try {
        const events = await prisma.failover_events.findMany({
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'Failover events fetched', events);
    } catch (error) {
        next(error);
    }
};

const getFailoverTriggers = async (req, res, next) => {
    try {
        const triggers = await prisma.failover_triggers.findMany();
        return sendResponse(res, 200, true, 'Failover triggers fetched', triggers);
    } catch (error) {
        next(error);
    }
};

const updateTriggerSettings = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        
        const updated = await prisma.failover_triggers.update({
            where: { triggerId: id },
            data: { ...payload }
        });
        return sendResponse(res, 200, true, 'Trigger settings updated', updated);
    } catch (error) {
        next(error);
    }
};

const triggerManualFailover = async (req, res, next) => {
    try {
        const { targetProcessor } = req.body;
        return sendResponse(res, 200, true, `Manual failover to ${targetProcessor || 'backup'} triggered successfully`);
    } catch (error) {
        next(error);
    }
};

const triggerRecovery = async (req, res, next) => {
    try {
        return sendResponse(res, 200, true, 'Primary processor recovery initiated');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardSummary,
    getProcessorHealth,
    getProcessingNodes,
    getVolumeAnalytics,
    getAlerts,
    configureNode,
    downloadReport,
    getFailoverMonitor,
    getFailoverEvents,
    getFailoverTriggers,
    updateTriggerSettings,
    triggerManualFailover,
    triggerRecovery
};
