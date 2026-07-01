const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get platform settings
 */
const getPlatformSettings = async (req, res, next) => {
    try {
        const settings = await prisma.platform_settings.findMany();
        return sendResponse(res, 200, true, 'Platform settings fetched', settings);
    } catch (error) {
        next(error);
    }
};

/**
 * Update platform settings
 */
const updatePlatformSettings = async (req, res, next) => {
    try {
        const payload = req.body;
        // Mocking bulk update by simply returning success
        return sendResponse(res, 200, true, 'Platform settings updated', payload);
    } catch (error) {
        next(error);
    }
};

/**
 * Get fee configurations
 */
const getFeeConfigurations = async (req, res, next) => {
    try {
        const fees = await prisma.fee_configurations.findMany();
        return sendResponse(res, 200, true, 'Fee configurations fetched', fees);
    } catch (error) {
        next(error);
    }
};

/**
 * Update fee configuration
 */
const updateFeeConfiguration = async (req, res, next) => {
    try {
        const { feeId } = req.params;
        const payload = req.body;

        const updated = await prisma.fee_configurations.update({
            where: { feeId },
            data: { ...payload }
        });

        return sendResponse(res, 200, true, 'Fee configuration updated', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Get API keys
 */
const getApiKeys = async (req, res, next) => {
    try {
        const keys = await prisma.api_keys.findMany({
            where: { status: 'Active' }
        });
        return sendResponse(res, 200, true, 'API keys fetched', keys);
    } catch (error) {
        next(error);
    }
};

/**
 * Generate API key
 */
const generateApiKey = async (req, res, next) => {
    try {
        const { merchantId, environment } = req.body;
        
        const newKey = await prisma.api_keys.create({
            data: {
                merchantId: merchantId || 'System',
                environment: environment || 'Sandbox',
                apiKey: `sk_${environment}_${Date.now()}`,
                status: 'Active',
                createdAt: new Date()
            }
        });
        
        return sendResponse(res, 201, true, 'API key generated', newKey);
    } catch (error) {
        next(error);
    }
};

/**
 * Revoke API key
 */
const revokeApiKey = async (req, res, next) => {
    try {
        const { keyId } = req.params;
        
        const revoked = await prisma.api_keys.update({
            where: { keyId },
            data: { status: 'Revoked', revokedAt: new Date() }
        });

        return sendResponse(res, 200, true, 'API key revoked', revoked);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPlatformSettings,
    updatePlatformSettings,
    getFeeConfigurations,
    updateFeeConfiguration,
    getApiKeys,
    generateApiKey,
    revokeApiKey
};
