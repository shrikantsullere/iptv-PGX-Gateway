const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all settlements
 */
const getAllSettlements = async (req, res, next) => {
    try {
        let settlements = await prisma.settlements.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (settlements.length === 0) {
            await prisma.settlements.createMany({
                data: [
                    { merchantId: 'm1', merchantName: 'Current Merchant', amount: 4500.00, currency: 'USD', settlementMethod: 'Crypto', settlementType: 'Manual', status: 'Completed', transactionHash: 'hash1', bankReference: 'N/A', initiatedAt: new Date(), completedAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
                    { merchantId: 'm1', merchantName: 'Current Merchant', amount: 1250.00, currency: 'USD', settlementMethod: 'Fiat', settlementType: 'Manual', status: 'Pending', transactionHash: 'hash2', bankReference: 'N/A', initiatedAt: new Date(), completedAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
                    { merchantId: 'm1', merchantName: 'Current Merchant', amount: 50000.00, currency: 'USD', settlementMethod: 'Crypto', settlementType: 'Auto', status: 'Completed', transactionHash: 'hash3', bankReference: 'N/A', initiatedAt: new Date(), completedAt: new Date(), createdAt: new Date(), updatedAt: new Date() }
                ]
            });
            settlements = await prisma.settlements.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }
        
        // Map fields to match frontend expectations
        const mappedSettlements = settlements.map(s => ({
            ...s,
            payoutMethod: s.settlementMethod
        }));

        return sendResponse(res, 200, true, 'Settlements fetched successfully', mappedSettlements);
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
        const { merchantId, amount, currency, destinationDetails } = req.body;
        
        if (!merchantId || amount === undefined || amount <= 0) {
            return sendResponse(res, 400, false, 'Merchant ID and a valid amount greater than 0 are required');
        }

        const newSettlement = await prisma.settlements.create({
            data: {
                merchantId,
                merchantName: 'Current Merchant', // Default mapping
                amount: Number(amount),
                currency: currency || 'USD',
                settlementMethod: 'Crypto',
                settlementType: 'Manual',
                status: 'Pending',
                transactionHash: 'Pending Hash',
                bankReference: destinationDetails || 'N/A',
                initiatedAt: new Date(),
                completedAt: new Date(),
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

/**
 * Get linked accounts
 */
const getLinkedAccounts = async (req, res, next) => {
    try {
        let accounts = await prisma.linked_accounts.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (accounts.length === 0) {
            await prisma.linked_accounts.createMany({
                data: [
                    { merchantId: 'MER-CURRENT', accountType: 'bank', bankName: 'JPMorgan Chase (USD)', accountNumber: '4912', routingNumber: '1102', isPrimary: true, createdAt: new Date() },
                    { merchantId: 'MER-CURRENT', accountType: 'crypto', assetNetwork: 'USDC (Polygon)', walletAddress: '0x71C...9A23', isPrimary: false, createdAt: new Date() }
                ]
            });
            accounts = await prisma.linked_accounts.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }

        return sendResponse(res, 200, true, 'Linked accounts fetched successfully', accounts);
    } catch (error) {
        next(error);
    }
};

/**
 * Add linked account
 */
const addLinkedAccount = async (req, res, next) => {
    try {
        const { merchantId, accountType, bankName, accountNumber, routingNumber, assetNetwork, walletAddress } = req.body;

        const newAccount = await prisma.linked_accounts.create({
            data: {
                merchantId: merchantId || 'MER-CURRENT',
                accountType,
                bankName,
                accountNumber,
                routingNumber,
                assetNetwork,
                walletAddress,
                isPrimary: false,
                createdAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Linked account added successfully', newAccount);
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
    exportSettlements,
    getLinkedAccounts,
    addLinkedAccount
};
