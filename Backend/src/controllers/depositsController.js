const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

const getDeposits = async (req, res, next) => {
    try {
        let deposits = await prisma.deposits.findMany({
            orderBy: { createdAt: 'desc' }
        });
        
        // Seed if empty to simulate workflow
        if (deposits.length === 0) {
            await prisma.deposits.createMany({
                data: [
                    { asset: 'USDT', network: 'TRC-20', amount: 2506.05, status: 'Confirmed', merchantId: 'm1' },
                    { asset: 'BTC', network: 'Bitcoin', amount: 313.66, status: 'Confirming', merchantId: 'm1' },
                    { asset: 'ETH', network: 'ERC-20', amount: 3715.93, status: 'Failed', merchantId: 'm1' }
                ]
            });
            deposits = await prisma.deposits.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }
        
        return sendResponse(res, 200, true, 'Deposits fetched successfully', deposits);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDeposits
};
