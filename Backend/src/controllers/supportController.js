const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all support tickets
 */
const getTickets = async (req, res, next) => {
    try {
        const tickets = await prisma.support_tickets.findMany({
            orderBy: { lastUpdated: 'desc' }
        });
        
        // Also compute some basic stats to return alongside tickets if needed, or frontend can calculate it.
        // Frontend expects 4 stats: Open, In Progress, Resolved (24H), Avg Response.
        // We'll let frontend calculate the first 3 from the tickets array, or we can send them. 
        // Sending just tickets is fine for now, we'll let frontend calculate basic counts from it.

        return sendResponse(res, 200, true, 'Support tickets fetched', tickets);
    } catch (error) {
        next(error);
    }
};

/**
 * Update ticket status (optional extra for future)
 */
const updateTicketStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const updated = await prisma.support_tickets.update({
            where: { ticketId: id },
            data: { status, lastUpdated: new Date() }
        });
        return sendResponse(res, 200, true, 'Ticket updated', updated);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTickets,
    updateTicketStatus
};
