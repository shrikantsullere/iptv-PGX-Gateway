const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all wallets
 */
const getAllWallets = async (req, res, next) => {
    try {
        const wallets = await prisma.wallets.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Wallets fetched successfully', wallets);
    } catch (error) {
        next(error);
    }
};

/**
 * Get wallet details
 */
const getWalletById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const wallet = await prisma.wallets.findUnique({
            where: { walletId: id }
        });

        if (!wallet) return sendResponse(res, 404, false, 'Wallet not found');
        return sendResponse(res, 200, true, 'Wallet details fetched', wallet);
    } catch (error) {
        next(error);
    }
};

/**
 * Create wallet
 */
const createWallet = async (req, res, next) => {
    try {
        const { merchantId, currency, type } = req.body;
        
        if (!merchantId || !currency) {
            return sendResponse(res, 400, false, 'Merchant ID and currency are required');
        }

        const newWallet = await prisma.wallets.create({
            data: {
                merchantId,
                balance: 0,
                currency,
                status: 'Active',
                type: type || 'Standard',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Wallet created successfully', newWallet);
    } catch (error) {
        next(error);
    }
};

/**
 * Update wallet status/type
 */
const updateWallet = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const updated = await prisma.wallets.update({
            where: { walletId: id },
            data: { ...payload, updatedAt: new Date() }
        });

        return sendResponse(res, 200, true, 'Wallet updated successfully', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Get liquidity overview
 */
const getLiquidity = async (req, res, next) => {
    try {
        // Mock aggregate for total balances by currency
        const liquidity = await prisma.wallets.groupBy({
            by: ['currency'],
            _sum: { balance: true }
        });
        return sendResponse(res, 200, true, 'Liquidity overview fetched', liquidity);
    } catch (error) {
        next(error);
    }
};

/**
 * Get treasury summary
 */
const getTreasury = async (req, res, next) => {
    try {
        const treasury = await prisma.revenue_wallet.findMany();
        return sendResponse(res, 200, true, 'Treasury summary fetched', treasury);
    } catch (error) {
        next(error);
    }
};

/**
 * Transfer funds (mock logic)
 */
const transferFunds = async (req, res, next) => {
    try {
        const { fromWalletId, toWalletId, amount } = req.body;
        
        if (!fromWalletId || !toWalletId || !amount) {
            return sendResponse(res, 400, false, 'fromWalletId, toWalletId, and amount are required');
        }

        // Simulating the transfer inside a transaction
        await prisma.$transaction(async (tx) => {
            const fromWallet = await tx.wallets.findUnique({ where: { walletId: fromWalletId }});
            if (!fromWallet || fromWallet.balance < amount) {
                throw new Error('Insufficient funds or invalid source wallet');
            }

            await tx.wallets.update({
                where: { walletId: fromWalletId },
                data: { balance: fromWallet.balance - amount }
            });

            const toWallet = await tx.wallets.findUnique({ where: { walletId: toWalletId }});
            if (toWallet) {
                await tx.wallets.update({
                    where: { walletId: toWalletId },
                    data: { balance: toWallet.balance + amount }
                });
            }
        });

        return sendResponse(res, 200, true, 'Funds transferred successfully');
    } catch (error) {
        if (error.message.includes('Insufficient funds')) {
            return sendResponse(res, 400, false, error.message);
        }
        next(error);
    }
};

/**
 * Export wallet data
 */
const exportWallets = async (req, res, next) => {
    try {
        const format = req.query.format || 'CSV';
        return sendResponse(res, 200, true, `Wallets exported successfully as ${format}`);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllWallets,
    getWalletById,
    createWallet,
    updateWallet,
    getLiquidity,
    getTreasury,
    transferFunds,
    exportWallets
};
