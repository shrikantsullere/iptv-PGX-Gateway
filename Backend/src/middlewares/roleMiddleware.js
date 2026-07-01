const { sendResponse } = require('../utils/responseHandler');

const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role || 'Super Admin';
        if (!allowedRoles.includes(userRole)) {
            return sendResponse(res, 403, false, 'Forbidden: Insufficient permissions');
        }
        next();
    };
};

module.exports = { requireRole };
