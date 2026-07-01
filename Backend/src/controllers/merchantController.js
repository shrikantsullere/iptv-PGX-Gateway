const merchantService = require('../services/merchantService');
const { sendResponse } = require('../utils/responseHandler');

const getMerchants = async (req, res, next) => {
    try {
        const { search } = req.query;
        let merchants;
        
        if (search) {
            merchants = await merchantService.searchMerchants(search);
        } else {
            merchants = await merchantService.getAllMerchants();
        }
        
        return sendResponse(res, 200, true, 'Merchants fetched successfully', merchants);
    } catch (error) {
        next(error);
    }
};

const getMerchantById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const merchant = await merchantService.getMerchantById(id);

        if (!merchant) return sendResponse(res, 404, false, 'Merchant not found');
        return sendResponse(res, 200, true, 'Merchant details fetched successfully', merchant);
    } catch (error) {
        next(error);
    }
};

const createMerchant = async (req, res, next) => {
    try {
        const payload = req.body;
        if (!payload.companyName || !payload.email) {
            return sendResponse(res, 400, false, 'Company Name and Email are required');
        }

        const newMerchant = await merchantService.createMerchant(payload);
        return sendResponse(res, 201, true, 'Merchant created successfully', newMerchant);
    } catch (error) {
        next(error);
    }
};

const updateMerchant = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        const updatedMerchant = await merchantService.updateMerchant(id, payload);
        return sendResponse(res, 200, true, 'Merchant updated successfully', updatedMerchant);
    } catch (error) {
        next(error);
    }
};

const changeMerchantStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Active', 'Inactive', 'Suspended'].includes(status)) {
            return sendResponse(res, 400, false, 'Invalid status provided');
        }

        const updatedMerchant = await merchantService.updateMerchant(id, { status });
        return sendResponse(res, 200, true, 'Merchant status changed to ' + status, updatedMerchant);
    } catch (error) {
        next(error);
    }
};

const deleteMerchant = async (req, res, next) => {
    try {
        const { id } = req.params;
        await merchantService.deleteMerchant(id);
        return sendResponse(res, 200, true, 'Merchant deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMerchants,
    getMerchantById,
    createMerchant,
    updateMerchant,
    changeMerchantStatus,
    deleteMerchant
};
