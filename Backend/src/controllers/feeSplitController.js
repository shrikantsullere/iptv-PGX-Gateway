const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

const getFeeSplit = async (req, res, next) => {
    try {
        const rules = await prisma.markup_rules.findMany({
            orderBy: { createdAt: 'asc' }
        });
        
        // Mocking fee distribution and bar data since they require joins and complex logic, 
        // or they might just be static system config.
        const feeDistribution = [
          { name: 'Gateway Revenue', value: 1.2, color: '#7C3AED' },
          { name: 'Processor Fee', value: 2.9, color: '#3B82F6' },
          { name: 'Network Fee', value: 0.3, color: '#06B6D4' },
          { name: 'Merchant Share', value: 95.6, color: '#22C55E' },
        ];
        
        const barData = [
          { name: 'Stripe', fee: 2.9 }, { name: 'MoonPay', fee: 3.4 }, { name: 'Coinbase', fee: 1.9 },
          { name: 'LocalGate', fee: 2.5 }, { name: 'Adyen', fee: 3.1 },
        ];

        return sendResponse(res, 200, true, 'Fee split data fetched', { rules, feeDistribution, barData });
    } catch (error) {
        next(error);
    }
};

const parsePercent = (str) => {
    if (!str) return 0;
    const parsed = parseFloat(str.toString().replace(/[^0-9.-]+/g,""));
    return isNaN(parsed) ? 0 : parseInt((parsed * 100).toFixed(0));
};

const createMarkupRule = async (req, res, next) => {
    try {
        const { type, base, markup, total } = req.body;
        
        const rule = await prisma.markup_rules.create({
            data: {
                transactionType: type || 'Unknown',
                processorBase: parsePercent(base),
                gatewayMarkup: parsePercent(markup),
                totalFee: parsePercent(total),
                status: 'Active',
                createdBy: 'System',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Markup rule created', rule);
    } catch (error) {
        next(error);
    }
};

const updateMarkupRule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type, base, markup, total } = req.body;
        
        const updated = await prisma.markup_rules.update({
            where: { ruleId: id },
            data: {
                transactionType: type || 'Unknown',
                processorBase: parsePercent(base),
                gatewayMarkup: parsePercent(markup),
                totalFee: parsePercent(total),
                updatedAt: new Date()
            }
        });

        return sendResponse(res, 200, true, 'Markup rule updated', updated);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFeeSplit,
    createMarkupRule,
    updateMarkupRule
};
