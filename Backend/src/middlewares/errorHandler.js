const { sendResponse } = require('../utils/responseHandler');

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return sendResponse(res, statusCode, false, message);
};

module.exports = {
    errorHandler
};
