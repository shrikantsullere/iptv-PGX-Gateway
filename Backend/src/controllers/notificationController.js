const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all broadcasts
 */
const getBroadcasts = async (req, res, next) => {
    try {
        const broadcasts = await prisma.broadcast_notifications.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Broadcasts fetched', broadcasts);
    } catch (error) {
        next(error);
    }
};

/**
 * Create broadcast
 */
const createBroadcast = async (req, res, next) => {
    try {
        const { title, body, type, target } = req.body;
        
        const newBroadcast = await prisma.broadcast_notifications.create({
            data: {
                title,
                message: body,
                category: type,
                targetAudience: target,
                status: 'Sent',
                createdBy: 'System',
                scheduledAt: new Date(),
                createdAt: new Date()
            }
        });
        
        return sendResponse(res, 201, true, 'Broadcast created', newBroadcast);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBroadcasts,
    createBroadcast
};
