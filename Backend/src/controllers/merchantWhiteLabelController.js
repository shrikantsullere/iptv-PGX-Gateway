const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSettings = async (req, res) => {
    try {
        const merchantId = req.user.merchantId || req.user.id;
        
        let settings = await prisma.merchant_white_label_settings.findUnique({
            where: { merchantId: merchantId }
        });

        if (!settings) {
            settings = await prisma.merchant_white_label_settings.create({
                data: { merchantId: merchantId }
            });
        }

        res.json({ success: true, data: settings });
    } catch (error) {
        console.error('Error fetching merchant white label settings:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const merchantId = req.user.merchantId || req.user.id;
        const updateData = req.body;

        // Ensure we only update allowed fields
        const allowedFields = [
            'domain', 'primaryColor', 'typography', 'senderName', 
            'replyToAddress', 'removePoweredBy', 'customFooter',
            'requireBillingAddress', 'requirePhoneNumber', 'collectCustomerKyc',
            'showCryptoFeeEstimates'
        ];
        
        const dataToUpdate = {};
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                dataToUpdate[field] = updateData[field];
            }
        }

        const updatedSettings = await prisma.merchant_white_label_settings.upsert({
            where: { merchantId: merchantId },
            update: dataToUpdate,
            create: {
                merchantId: merchantId,
                ...dataToUpdate
            }
        });

        res.json({ success: true, message: 'Settings updated successfully', data: updatedSettings });
    } catch (error) {
        console.error('Error updating merchant white label settings:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
