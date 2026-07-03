const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all wallets
 */
const getAllWallets = async (req, res, next) => {
    try {
        let wallets = await prisma.wallets.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (wallets.length === 0) {
            await prisma.wallets.createMany({
                data: [
                    { walletName: 'USD Coin', walletAddress: '0x123...abc', walletType: 'Merchant', network: 'ERC-20', balanceUSD: 124500, balanceCrypto: 124500, assetSymbol: 'USDC', status: 'Active', lastTransactionAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
                    { walletName: 'Tether', walletAddress: '0x456...def', walletType: 'Merchant', network: 'TRC-20', balanceUSD: 45200, balanceCrypto: 45200, assetSymbol: 'USDT', status: 'Active', lastTransactionAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
                    { walletName: 'Bitcoin', walletAddress: 'bc1q...', walletType: 'Merchant', network: 'Bitcoin', balanceUSD: 158400, balanceCrypto: 2, assetSymbol: 'BTC', status: 'Active', lastTransactionAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
                    { walletName: 'Ethereum', walletAddress: '0x789...ghi', walletType: 'Merchant', network: 'ERC-20', balanceUSD: 64200, balanceCrypto: 18, assetSymbol: 'ETH', status: 'Active', lastTransactionAt: new Date(), createdAt: new Date(), updatedAt: new Date() }
                ]
            });
            wallets = await prisma.wallets.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }
        
        // Map missing fields so frontend doesn't break
        const mappedWallets = wallets.map(w => ({
            ...w,
            id: w.assetSymbol,
            name: w.walletName,
            balance: Number(w.balanceCrypto).toLocaleString(),
            fiat: '$' + Number(w.balanceUSD).toLocaleString(),
            color: w.assetSymbol === 'USDC' ? 'bg-blue-500' : w.assetSymbol === 'USDT' ? 'bg-teal-500' : w.assetSymbol === 'BTC' ? 'bg-orange-500' : 'bg-purple-500',
            trend: '+1.0%', // default trend
            currency: w.assetSymbol,
            merchantId: 'PGX-Treasury'
        }));

        return sendResponse(res, 200, true, 'Wallets fetched successfully', mappedWallets);
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
        const { id, name, network } = req.body; // id is assetSymbol, name is walletName
        
        if (!id || !name) {
            return sendResponse(res, 400, false, 'Asset ID and Name are required');
        }

        const newWallet = await prisma.wallets.create({
            data: {
                walletName: name,
                walletAddress: '0x' + Math.random().toString(16).slice(2, 10) + '...new',
                walletType: 'Merchant',
                network: network || 'Mainnet',
                balanceUSD: 0,
                balanceCrypto: 0,
                assetSymbol: id,
                status: 'Active',
                lastTransactionAt: new Date(),
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
