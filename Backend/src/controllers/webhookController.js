const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get webhook endpoints
 */
const getWebhooks = async (req, res, next) => {
    try {
        const webhooks = await prisma.webhook_endpoints.findMany();
        return sendResponse(res, 200, true, 'Webhook endpoints fetched', webhooks);
    } catch (error) {
        next(error);
    }
};

/**
 * Trigger webhook test
 */
const testWebhook = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Mocking successful webhook test
        return sendResponse(res, 200, true, 'Webhook test payload delivered successfully (mock)');
    } catch (error) {
        next(error);
    }
};

/**
 * Get webhook delivery logs
 */
const getWebhookLogs = async (req, res, next) => {
    try {
        const logs = await prisma.webhook_logs.findMany({
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'Webhook delivery logs fetched', logs);
    } catch (error) {
        next(error);
    }
};

/**
 * Get notifications setup/templates
 */
const getNotifications = async (req, res, next) => {
    try {
        const notifications = await prisma.notification_templates.findMany();
        return sendResponse(res, 200, true, 'Notification templates fetched', notifications);
    } catch (error) {
        next(error);
    }
};

/**
 * Update notification templates
 */
const updateNotification = async (req, res, next) => {
    try {
        const { templateId } = req.params;
        const payload = req.body;
        
        const updated = await prisma.notification_templates.update({
            where: { templateId },
            data: { ...payload }
        });
        return sendResponse(res, 200, true, 'Notification template updated', updated);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWebhooks,
    testWebhook,
    getWebhookLogs,
    getNotifications,
    updateNotification
};
