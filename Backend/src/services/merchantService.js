const prisma = require('../utils/prismaClient');

const getAllMerchants = async () => {
    return await prisma.merchants.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

const getMerchantById = async (id) => {
    return await prisma.merchants.findUnique({
        where: { merchantId: id }
    });
};

const searchMerchants = async (query) => {
    return await prisma.merchants.findMany({
        where: {
            OR: [
                { companyName: { contains: query } },
                { email: { contains: query } }
            ]
        }
    });
};

const createMerchant = async (data) => {
    return await prisma.merchants.create({
        data: {
            ...data,
            merchantId: `MER_${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
};

const updateMerchant = async (id, data) => {
    return await prisma.merchants.update({
        where: { merchantId: id },
        data: { ...data, updatedAt: new Date() }
    });
};

const deleteMerchant = async (id) => {
    return await prisma.merchants.delete({
        where: { merchantId: id }
    });
};

module.exports = {
    getAllMerchants,
    getMerchantById,
    searchMerchants,
    createMerchant,
    updateMerchant,
    deleteMerchant
};
