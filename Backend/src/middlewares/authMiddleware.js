const { sendResponse } = require('../utils/responseHandler');

/**
 * Mock Auth Middleware (Phase 1)
 * Validates Bearer Token for routes, but accepts a dummy token for easy testing.
 */
const verifyToken = (req, res, next) => {
    // TODO: Implement actual jsonwebtoken verification here
    const authHeader = req.headers['authorization'];
    
    // Mock Authentication for development
    // In production, this would verify a real JWT token from headers
    const mockUser = {
        id: 'usr_admin123',
        role: 'Super Admin',
        email: 'admin@pgxgateway.com'
    };

    req.user = mockUser;
    next();
};

module.exports = { verifyToken };
