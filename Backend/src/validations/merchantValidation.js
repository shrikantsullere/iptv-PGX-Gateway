const Joi = require('joi');

const createMerchantSchema = Joi.object({
    companyName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(''),
    subscriptionPlan: Joi.string().valid('Starter', 'Business', 'Enterprise').optional(),
    country: Joi.string().length(2).optional(),
    website: Joi.string().uri().optional().allow('')
});

const updateMerchantSchema = Joi.object({
    companyName: Joi.string().min(3).max(100).optional(),
    phone: Joi.string().optional().allow(''),
    subscriptionPlan: Joi.string().valid('Starter', 'Business', 'Enterprise').optional(),
    status: Joi.string().valid('Active', 'Inactive', 'Suspended').optional()
});

module.exports = {
    createMerchantSchema,
    updateMerchantSchema
};
