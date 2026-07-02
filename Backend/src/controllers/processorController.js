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

        const nodes = await prisma.processor_monitors.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        const metrics = await prisma.processor_metrics.findMany({
            orderBy: { createdAt: 'desc' },
            take: 21 // 7 timestamps * 3 processors
        });

        // Group metrics into volumeData for frontend chart
        // Example volumeData: { time: '00:00', stripe: 4000, moonpay: 2400, coinbase: 2400 }
        const timeMap = {};
        metrics.forEach(m => {
            if (!timeMap[m.reportingPeriod]) {
                timeMap[m.reportingPeriod] = { time: m.reportingPeriod };
            }
            if (m.processorName === 'Stripe') timeMap[m.reportingPeriod].stripe = m.transactionVolume;
            if (m.processorName === 'MoonPay') timeMap[m.reportingPeriod].moonpay = m.transactionVolume;
            if (m.processorName === 'Coinbase') timeMap[m.reportingPeriod].coinbase = m.transactionVolume;
        });
        
        // Sort the volume data by time
        const volumeData = Object.values(timeMap).sort((a, b) => a.time.localeCompare(b.time));

        return sendResponse(res, 200, true, 'Processor dashboard summary fetched', {
            summary: summary[0] || {},
            nodes: nodes,
            volumeData: volumeData
        });
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
        // Fetch nodes from processor_monitors
        const nodes = await prisma.processor_monitors.findMany({
            orderBy: { createdAt: 'desc' }
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
            orderBy: { failoverAt: 'desc' }
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
            orderBy: { failoverAt: 'desc' }
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

const getFailoverLogs = async (req, res, next) => {
    try {
        const logs = await prisma.processor_logs.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        return sendResponse(res, 200, true, 'Failover logs fetched', logs);
    } catch (error) {
        next(error);
    }
};

const getAlertSettings = async (req, res, next) => {
    try {
        const settings = await prisma.alert_settings.findFirst();
        return sendResponse(res, 200, true, 'Alert settings fetched', settings || {});
    } catch (error) {
        next(error);
    }
};

const updateAlertSettings = async (req, res, next) => {
    try {
        const payload = req.body;
        
        let settings = await prisma.alert_settings.findFirst();
        if (settings) {
            settings = await prisma.alert_settings.update({
                where: { id: settings.id },
                data: { ...payload }
            });
        } else {
            settings = await prisma.alert_settings.create({
                data: { ...payload }
            });
        }
        
        return sendResponse(res, 200, true, 'Alert settings updated', settings);
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
    triggerRecovery,
    getFailoverLogs,
    getAlertSettings,
    updateAlertSettings
};
