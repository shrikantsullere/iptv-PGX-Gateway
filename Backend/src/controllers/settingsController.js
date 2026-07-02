const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get platform settings
 */
const getPlatformSettings = async (req, res, next) => {
    try {
        let settings = await prisma.platform_settings.findFirst();
        if (!settings) {
            settings = {
                maintenanceMode: false,
                sandboxEnvironment: true,
                force2FA: true,
                strictIPWhitelisting: false
            };
        }
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
        
        let existing = await prisma.platform_settings.findFirst();
        let updated;
        if (existing) {
            updated = await prisma.platform_settings.update({
                where: { settingId: existing.settingId },
                data: {
                    maintenanceMode: payload.maintenanceMode,
                    sandboxEnvironment: payload.sandboxEnvironment,
                    force2FA: payload.force2FA,
                    strictIPWhitelisting: payload.strictIPWhitelisting,
                    updatedBy: req.user?.id || 'System',
                    updatedAt: new Date()
                }
            });
        } else {
            updated = await prisma.platform_settings.create({
                data: {
                    maintenanceMode: payload.maintenanceMode,
                    sandboxEnvironment: payload.sandboxEnvironment,
                    force2FA: payload.force2FA,
                    strictIPWhitelisting: payload.strictIPWhitelisting,
                    updatedBy: req.user?.id || 'System',
                    updatedAt: new Date()
                }
            });
        }
        
        return sendResponse(res, 200, true, 'Platform settings updated', updated);
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
            where: { status: 'Active' },
            orderBy: { createdAt: 'desc' }
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
        const { keyName, environment } = req.body;
        
        const envPrefix = environment === 'Production' ? 'pk_live_' : 'pk_test_';
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const apiToken = envPrefix + randomString;

        const newKey = await prisma.api_keys.create({
            data: {
                keyName: keyName || 'Unnamed Key',
                environment: environment || 'Sandbox',
                apiToken: apiToken,
                status: 'Active',
                permissions: {},
                lastUsedAt: new Date(),
                createdBy: 'System',
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
            data: { status: 'Revoked' }
        });

        return sendResponse(res, 200, true, 'API key revoked', revoked);
    } catch (error) {
        next(error);
    }
};

/**
 * Gateway Fees
 */
const getGatewayFees = async (req, res, next) => {
    try {
        let fees = await prisma.gateway_fees.findFirst();
        if (!fees) {
            fees = { basePlatformFee: 0, fixedTransactionFee: 0, whiteLabelMarkup: 0 };
        }
        return sendResponse(res, 200, true, 'Gateway fees fetched', fees);
    } catch (error) {
        next(error);
    }
};

const updateGatewayFees = async (req, res, next) => {
    try {
        const payload = req.body;
        // Check if exists
        const existing = await prisma.gateway_fees.findFirst();
        let updated;
        if (existing) {
            updated = await prisma.gateway_fees.update({
                where: { feeId: existing.feeId },
                data: {
                    basePlatformFee: Math.round(parseFloat(payload.basePlatformFee) * 100) || 0,
                    fixedTransactionFee: Math.round(parseFloat(payload.fixedTransactionFee) * 100) || 0,
                    whiteLabelMarkup: Math.round(parseFloat(payload.whiteLabelMarkup) * 100) || 0,
                    updatedBy: req.user?.id || 'system',
                    updatedAt: new Date()
                }
            });
        } else {
            updated = await prisma.gateway_fees.create({
                data: {
                    basePlatformFee: Math.round(parseFloat(payload.basePlatformFee) * 100) || 0,
                    fixedTransactionFee: Math.round(parseFloat(payload.fixedTransactionFee) * 100) || 0,
                    whiteLabelMarkup: Math.round(parseFloat(payload.whiteLabelMarkup) * 100) || 0,
                    updatedBy: req.user?.id || 'system',
                    updatedAt: new Date()
                }
            });
        }
        return sendResponse(res, 200, true, 'Gateway fees updated', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Processor Fees
 */
const getProcessorFees = async (req, res, next) => {
    try {
        const fees = await prisma.processor_fees.findMany();
        return sendResponse(res, 200, true, 'Processor fees fetched', fees);
    } catch (error) {
        next(error);
    }
};

const updateProcessorFees = async (req, res, next) => {
    try {
        const { processors } = req.body;
        // Processors is an array of { name, fee }
        
        await prisma.processor_fees.deleteMany({});
        
        const created = await Promise.all(
            processors.map(p => prisma.processor_fees.create({
                data: {
                    processorName: p.name,
                    feePercentage: Math.round(parseFloat(p.fee) * 100) || 0,
                    updatedBy: req.user?.id || 'system',
                    updatedAt: new Date()
                }
            }))
        );
        
        return sendResponse(res, 200, true, 'Processor fees updated', created);
    } catch (error) {
        next(error);
    }
};

/**
 * Fee Rules
 */
const createFeeRule = async (req, res, next) => {
    try {
        const payload = req.body;
        const rule = await prisma.fee_rules.create({
            data: {
                ruleName: payload.ruleName,
                merchantScope: payload.merchantScope,
                feePercentage: Math.round(parseFloat(payload.feePercentage) * 100) || 0,
                fixedFee: Math.round(parseFloat(payload.fixedFee) * 100) || 0,
                status: 'Active',
                createdBy: req.user?.id || 'system',
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Fee rule created', rule);
    } catch (error) {
        next(error);
    }
};

/**
 * Subscriptions
 */
const getSubscriptions = async (req, res, next) => {
    try {
        const plans = await prisma.subscription_plans.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return sendResponse(res, 200, true, 'Subscription plans fetched', plans);
    } catch (error) {
        next(error);
    }
};

const createSubscription = async (req, res, next) => {
    try {
        const payload = req.body;
        const newPlan = await prisma.subscription_plans.create({
            data: {
                planName: payload.planName,
                themeColor: payload.themeColor,
                monthlyPrice: parseInt(payload.monthlyPrice) || 0,
                billingCycle: payload.billingCycle,
                transactionFee: parseInt(payload.transactionFee) || 0,
                features: payload.features || [],
                status: 'Active',
                createdBy: req.user?.id || 'system',
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Subscription plan created', newPlan);
    } catch (error) {
        next(error);
    }
};

const updateSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updated = await prisma.subscription_plans.update({
            where: { planId: id },
            data: {
                planName: payload.planName,
                themeColor: payload.themeColor,
                monthlyPrice: parseInt(payload.monthlyPrice) || 0,
                billingCycle: payload.billingCycle,
                transactionFee: parseInt(payload.transactionFee) || 0,
                features: payload.features || [],
            }
        });
        return sendResponse(res, 200, true, 'Subscription plan updated', updated);
    } catch (error) {
        next(error);
    }
};

const deleteSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.subscription_plans.delete({
            where: { planId: id }
        });
        return sendResponse(res, 200, true, 'Subscription plan deleted');
    } catch (error) {
        next(error);
    }
};

/**
 * Countries
 */
const getCountries = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Countries fetched', countries);
    } catch (error) {
        next(error);
    }
};

const createCountry = async (req, res, next) => {
    try {
        const payload = req.body;
        const newCountry = await prisma.countries.create({
            data: {
                countryName: payload.name,
                countryCode: payload.code,
                region: payload.region,
                status: payload.status,
                merchantCount: payload.merchants || 0,
                paymentMethodCount: payload.methods || 0,
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Country added', newCountry);
    } catch (error) {
        next(error);
    }
};

const updateCountry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updated = await prisma.countries.update({
            where: { countryId: id },
            data: {
                countryName: payload.name,
                countryCode: payload.code,
                region: payload.region,
                status: payload.status,
                merchantCount: payload.merchants || 0,
                paymentMethodCount: payload.methods || 0
            }
        });
        return sendResponse(res, 200, true, 'Country updated', updated);
    } catch (error) {
        next(error);
    }
};

const deleteCountry = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.countries.delete({
            where: { countryId: id }
        });
        return sendResponse(res, 200, true, 'Country deleted');
    } catch (error) {
        next(error);
    }
};

/**
 * Currencies
 */
const getCurrencies = async (req, res, next) => {
    try {
        const currencies = await prisma.currencies.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Currencies fetched', currencies);
    } catch (error) {
        next(error);
    }
};

const createCurrency = async (req, res, next) => {
    try {
        const payload = req.body;
        const newCurrency = await prisma.currencies.create({
            data: {
                assetCode: payload.code,
                assetName: payload.name,
                assetType: payload.type,
                exchangeRateUSD: Math.round(parseFloat(payload.rate) * 10000) || 0,
                conversionFee: Math.round(parseFloat(payload.fee) * 100) || 0,
                status: payload.status || 'Active',
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Currency added', newCurrency);
    } catch (error) {
        next(error);
    }
};

const updateCurrency = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const updated = await prisma.currencies.update({
            where: { assetId: id },
            data: {
                assetCode: payload.code,
                assetName: payload.name,
                assetType: payload.type,
                exchangeRateUSD: Math.round(parseFloat(payload.rate) * 10000) || 0,
                conversionFee: Math.round(parseFloat(payload.fee) * 100) || 0,
                status: payload.status || 'Active',
            }
        });
        return sendResponse(res, 200, true, 'Currency updated', updated);
    } catch (error) {
        next(error);
    }
};

const deleteCurrency = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.currencies.delete({
            where: { assetId: id }
        });
        return sendResponse(res, 200, true, 'Currency deleted');
    } catch (error) {
        next(error);
    }
};

/**
 * Webhooks
 */
const getWebhooks = async (req, res, next) => {
    try {
        const endpoints = await prisma.webhook_endpoints.findMany({
            where: { status: 'Active' },
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Webhooks fetched', endpoints);
    } catch (error) {
        next(error);
    }
};

const createWebhook = async (req, res, next) => {
    try {
        const { endpoint, event, secret } = req.body;
        const newEndpoint = await prisma.webhook_endpoints.create({
            data: {
                endpointUrl: endpoint,
                eventType: event || '*',
                secretKey: secret || `whsec_${Date.now()}`,
                status: 'Active',
                createdBy: 'System',
                createdAt: new Date()
            }
        });
        return sendResponse(res, 201, true, 'Webhook created', newEndpoint);
    } catch (error) {
        next(error);
    }
};

const getWebhookDeliveries = async (req, res, next) => {
    try {
        const deliveries = await prisma.webhook_deliveries.findMany({
            orderBy: { deliveredAt: 'desc' },
            take: 100
        });
        return sendResponse(res, 200, true, 'Webhook deliveries fetched', deliveries);
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
    revokeApiKey,
    getGatewayFees,
    updateGatewayFees,
    getProcessorFees,
    updateProcessorFees,
    createFeeRule,
    getSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    getCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    getCurrencies,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    getWebhooks,
    createWebhook,
    getWebhookDeliveries
};
