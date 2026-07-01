const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all settlements
 */
const getAllSettlements = async (req, res, next) => {
    try {
        const settlements = await prisma.settlements.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Settlements fetched successfully', settlements);
    } catch (error) {
        next(error);
    }
};

/**
 * Get settlement details
 */
const getSettlementById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const settlement = await prisma.settlements.findUnique({
            where: { settlementId: id }
        });

        if (!settlement) return sendResponse(res, 404, false, 'Settlement not found');
        return sendResponse(res, 200, true, 'Settlement details fetched', settlement);
    } catch (error) {
        next(error);
    }
};

/**
 * Create settlement request
 */
const createSettlement = async (req, res, next) => {
    try {
        const { merchantId, amount, currency, bankDetails } = req.body;
        
        if (!merchantId || !amount) {
            return sendResponse(res, 400, false, 'Merchant ID and amount are required');
        }

        const newSettlement = await prisma.settlements.create({
            data: {
                merchantId,
                amount,
                currency: currency || 'USD',
                fee: amount * 0.01, // Example mock 1% fee
                netAmount: amount - (amount * 0.01),
                status: 'Pending',
                bankDetails: bankDetails || 'Standard Bank Info',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Settlement created successfully', newSettlement);
    } catch (error) {
        next(error);
    }
};

/**
 * Update settlement status
 */
const updateSettlementStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) return sendResponse(res, 400, false, 'Status is required');

        const updated = await prisma.settlements.update({
            where: { settlementId: id },
            data: { status, updatedAt: new Date() }
        });

        return sendResponse(res, 200, true, 'Settlement status updated', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Get settlement queue
 */
const getSettlementQueue = async (req, res, next) => {
    try {
        const queue = await prisma.settlements.findMany({
            where: { status: 'Pending' },
            orderBy: { createdAt: 'asc' }
        });
        return sendResponse(res, 200, true, 'Settlement queue fetched', queue);
    } catch (error) {
        next(error);
    }
};

/**
 * Get settlement statistics (analytics)
 */
const getSettlementAnalytics = async (req, res, next) => {
    try {
        const stats = await prisma.settlements.aggregate({
            _sum: { amount: true, fee: true },
            _count: { settlementId: true }
        });
        return sendResponse(res, 200, true, 'Settlement analytics fetched', stats);
    } catch (error) {
        next(error);
    }
};

/**
 * Export settlements
 */
const exportSettlements = async (req, res, next) => {
    try {
        const format = req.query.format || 'CSV';
        return sendResponse(res, 200, true, `Settlements exported successfully as ${format}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSettlements,
    getSettlementById,
    createSettlement,
    updateSettlementStatus,
    getSettlementQueue,
    getSettlementAnalytics,
    exportSettlements
};
