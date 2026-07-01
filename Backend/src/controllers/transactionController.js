const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Fetch all transactions
 */
const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await prisma.transactions.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Transactions fetched successfully', transactions);
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch transaction details
 */
const getTransactionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await prisma.transactions.findUnique({
            where: { transactionId: id }
        });

        if (!transaction) {
            return sendResponse(res, 404, false, 'Transaction not found');
        }

        return sendResponse(res, 200, true, 'Transaction details fetched successfully', transaction);
    } catch (error) {
        next(error);
    }
};

/**
 * Global transaction search
 */
const searchTransactions = async (req, res, next) => {
    try {
        const { keyword, merchant, customer, wallet, transactionHash } = req.query;
        let where = {};
        
        if (keyword) {
            where.OR = [
                { transactionId: { contains: keyword } },
                { customerName: { contains: keyword } },
                { merchantName: { contains: keyword } }
            ];
        }
        
        if (merchant) where.merchantName = { contains: merchant };
        if (customer) where.customerName = { contains: customer };
        if (wallet) where.walletAddress = wallet;
        if (transactionHash) where.transactionHash = transactionHash;

        const results = await prisma.transactions.findMany({ where });
        return sendResponse(res, 200, true, 'Search results fetched', results);
    } catch (error) {
        next(error);
    }
};

/**
 * Advanced transaction filtering
 */
const filterTransactions = async (req, res, next) => {
    try {
        const { status, processor, merchant, currency, dateFrom, dateTo } = req.query;
        let where = {};

        if (status) where.status = status;
        if (processor) where.processor = processor;
        if (merchant) where.merchantName = { contains: merchant };
        if (currency) where.currency = currency;
        
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const results = await prisma.transactions.findMany({ where });
        return sendResponse(res, 200, true, 'Filtered transactions fetched', results);
    } catch (error) {
        next(error);
    }
};

/**
 * Export transactions
 */
const exportTransactions = async (req, res, next) => {
    try {
        const format = req.query.format || 'CSV';
        // Mock export functionality
        return sendResponse(res, 200, true, `Transactions exported as ${format} successfully`);
    } catch (error) {
        next(error);
    }
};

/**
 * Fetch transaction statistics
 */
const getTransactionStats = async (req, res, next) => {
    try {
        // Simple mock stats using Prisma aggregate
        const stats = await prisma.transactions.aggregate({
            _count: { transactionId: true },
            _sum: { amount: true }
        });
        
        return sendResponse(res, 200, true, 'Transaction statistics fetched successfully', {
            totalTransactions: stats._count.transactionId,
            totalVolume: stats._sum.amount || 0
        });
    } catch (error) {
        next(error);
    }
};

const refundTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const transaction = await transactionService.getTransactionById(id);
        if (!transaction) return sendResponse(res, 404, false, 'Transaction not found');
        if (transaction.status !== 'Completed') {
            return sendResponse(res, 400, false, 'Only completed transactions can be refunded');
        }

        const refunded = await transactionService.updateTransactionStatus(id, 'Refunded');
        return sendResponse(res, 200, true, 'Transaction refunded successfully', refunded);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    searchTransactions,
    filterTransactions,
    exportTransactions,
    getTransactionStats,
    refundTransaction
};
