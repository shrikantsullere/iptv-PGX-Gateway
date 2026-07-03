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

const getMerchantWebhooks = async (req, res, next) => {
    try {
        let endpoints = await prisma.webhook_endpoints.findMany({
            where: { createdBy: 'MER-CURRENT' },
            orderBy: { createdAt: 'desc' }
        });

        // Auto-seed if no endpoints exist for the sake of the dashboard
        if (endpoints.length === 0) {
            const seedEndpoint = await prisma.webhook_endpoints.create({
                data: {
                    endpointUrl: 'https://api.acme.com/webhooks/pgx',
                    eventType: 'payment.*,payout.*',
                    secretKey: 'whsec_' + Math.random().toString(36).substr(2, 9),
                    status: 'ACTIVE',
                    createdBy: 'MER-CURRENT',
                    createdAt: new Date()
                }
            });

            endpoints = [seedEndpoint];

            // Seed logs
            const logsToSeed = [
                { endpointId: seedEndpoint.endpointId, eventType: 'payment.created', payload: '{}', responseCode: 200, responseMessage: 'OK', status: '200 OK', deliveredAt: new Date(Date.now() - 5 * 60000) },
                { endpointId: seedEndpoint.endpointId, eventType: 'payment.failed', payload: '{}', responseCode: 200, responseMessage: 'OK', status: '200 OK', deliveredAt: new Date(Date.now() - 15 * 60000) },
                { endpointId: seedEndpoint.endpointId, eventType: 'payout.processed', payload: '{}', responseCode: 200, responseMessage: 'OK', status: '200 OK', deliveredAt: new Date(Date.now() - 30 * 60000) },
                { endpointId: seedEndpoint.endpointId, eventType: 'payment.failed', payload: '{}', responseCode: 500, responseMessage: 'Error', status: '500 Error', deliveredAt: new Date(Date.now() - 45 * 60000) },
                { endpointId: seedEndpoint.endpointId, eventType: 'payout.processed', payload: '{}', responseCode: 200, responseMessage: 'OK', status: '200 OK', deliveredAt: new Date(Date.now() - 60 * 60000) },
            ];
            await prisma.webhook_deliveries.createMany({ data: logsToSeed });
        }

        const logs = await prisma.webhook_deliveries.findMany({
            where: { endpointId: { in: endpoints.map(e => e.endpointId) } },
            orderBy: { deliveredAt: 'desc' },
            take: 10
        });

        return sendResponse(res, 200, true, 'Webhooks fetched successfully', { endpoints, logs });
    } catch (error) {
        next(error);
    }
};

const createMerchantWebhook = async (req, res, next) => {
    try {
        const { endpointUrl, events } = req.body;
        const newEndpoint = await prisma.webhook_endpoints.create({
            data: {
                endpointUrl,
                eventType: events.join(','),
                secretKey: 'whsec_' + Math.random().toString(36).substr(2, 9),
                status: 'ACTIVE',
                createdBy: 'MER-CURRENT',
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Webhook created successfully', newEndpoint);
    } catch (error) {
        next(error);
    }
};

const updateMerchantWebhook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { endpointUrl, events } = req.body;
        const updatedEndpoint = await prisma.webhook_endpoints.update({
            where: { endpointId: id },
            data: {
                endpointUrl,
                eventType: events.join(',')
            }
        });
        return sendResponse(res, 200, true, 'Webhook updated successfully', updatedEndpoint);
    } catch (error) {
        next(error);
    }
};

const deleteMerchantWebhook = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.webhook_deliveries.deleteMany({ where: { endpointId: id } });
        await prisma.webhook_endpoints.delete({ where: { endpointId: id } });
        return sendResponse(res, 200, true, 'Webhook deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWebhooks,
    testWebhook,
    getWebhookLogs,
    getNotifications,
    updateNotification,
    getMerchantWebhooks,
    createMerchantWebhook,
    updateMerchantWebhook,
    deleteMerchantWebhook
};
