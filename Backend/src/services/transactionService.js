const prisma = require('../utils/prismaClient');

const getTransactions = async (filters) => {
    let where = {};
    if (filters.status) where.status = filters.status;
    if (filters.merchantId) where.merchantId = filters.merchantId;

    return await prisma.transactions.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    });
};

const getTransactionById = async (id) => {
    return await prisma.transactions.findUnique({
        where: { transactionId: id }
    });
};

const updateTransactionStatus = async (id, status) => {
    return await prisma.transactions.update({
        where: { transactionId: id },
        data: { status, updatedAt: new Date() }
    });
};

module.exports = {
    getTransactions,
    getTransactionById,
    updateTransactionStatus
};
