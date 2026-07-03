const fs = require('fs');
let code = fs.readFileSync('Backend/src/controllers/processorController.js', 'utf8');

const newMethods = `
const getRevenueWalletData = async (req, res, next) => {
    try {
        let wallet = await prisma.revenue_wallet.findFirst();
        if (!wallet) {
            wallet = await prisma.revenue_wallet.create({
                data: {
                    totalRevenuePool: 4124088,
                    monthlyRevenue: 820000,
                    averageDailyRevenue: 27300,
                    totalWithdrawn: 7850000,
                    revenueSources: 4,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }
        
        let history = await prisma.monthly_revenue_history.findMany({ orderBy: { createdAt: 'asc' } });
        if (history.length === 0) {
            await prisma.monthly_revenue_history.createMany({
                data: [
                    { month: 'Jan', year: 2026, revenueAmount: 1840000, createdAt: new Date(Date.now() - 86400000 * 150) },
                    { month: 'Feb', year: 2026, revenueAmount: 2210000, createdAt: new Date(Date.now() - 86400000 * 120) },
                    { month: 'Mar', year: 2026, revenueAmount: 1980000, createdAt: new Date(Date.now() - 86400000 * 90) },
                    { month: 'Apr', year: 2026, revenueAmount: 2840000, createdAt: new Date(Date.now() - 86400000 * 60) },
                    { month: 'May', year: 2026, revenueAmount: 3210000, createdAt: new Date(Date.now() - 86400000 * 30) },
                    { month: 'Jun', year: 2026, revenueAmount: 4120000, createdAt: new Date() },
                ]
            });
            history = await prisma.monthly_revenue_history.findMany({ orderBy: { createdAt: 'asc' } });
        }

        let withdrawals = await prisma.revenue_withdrawals.findMany({ orderBy: { completedAt: 'desc' } });
        if (withdrawals.length === 0) {
            await prisma.revenue_withdrawals.createMany({
                data: [
                    { amount: 2500000, destination: 'Bank ****4421', status: 'Completed', initiatedBy: 'Super Admin', withdrawalDate: new Date('2025-06-15'), completedAt: new Date('2025-06-15') },
                    { amount: 2000000, destination: 'Bank ****4421', status: 'Completed', initiatedBy: 'Super Admin', withdrawalDate: new Date('2025-05-15'), completedAt: new Date('2025-05-15') },
                    { amount: 1850000, destination: 'Cold Wallet', status: 'Completed', initiatedBy: 'Super Admin', withdrawalDate: new Date('2025-04-15'), completedAt: new Date('2025-04-15') },
                    { amount: 1500000, destination: 'Bank ****4421', status: 'Completed', initiatedBy: 'Super Admin', withdrawalDate: new Date('2025-03-15'), completedAt: new Date('2025-03-15') },
                ]
            });
            withdrawals = await prisma.revenue_withdrawals.findMany({ orderBy: { completedAt: 'desc' } });
        }

        return sendResponse(res, 200, true, 'Revenue wallet data fetched', { wallet, history, withdrawals });
    } catch (error) {
        next(error);
    }
};

const withdrawRevenue = async (req, res, next) => {
    try {
        const { amount, destination } = req.body;
        const parsedAmount = parseFloat(amount.replace(/[^0-9.-]+/g, '')) * 100 || 0;
        
        let wallet = await prisma.revenue_wallet.findFirst();
        if (wallet && wallet.totalRevenuePool >= parsedAmount) {
            await prisma.revenue_wallet.update({
                where: { walletId: wallet.walletId },
                data: {
                    totalRevenuePool: wallet.totalRevenuePool - parsedAmount,
                    totalWithdrawn: wallet.totalWithdrawn + parsedAmount,
                    updatedAt: new Date()
                }
            });
        }

        const w = await prisma.revenue_withdrawals.create({
            data: {
                amount: parsedAmount,
                destination: destination,
                status: 'Completed',
                initiatedBy: 'Admin',
                withdrawalDate: new Date(),
                completedAt: new Date()
            }
        });

        return sendResponse(res, 200, true, 'Withdrawal successful', w);
    } catch (error) {
        next(error);
    }
};
`;

const expRegex = /module\.exports = \{([\s\S]*?)\};/;
code = code.replace(expRegex, (match, p1) => {
    return newMethods + '\nmodule.exports = {' + p1 + '    getRevenueWalletData,\n    withdrawRevenue\n};';
});

fs.writeFileSync('Backend/src/controllers/processorController.js', code);
console.log('done');
