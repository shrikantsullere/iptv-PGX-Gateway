const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, false, 'Email and password are required');
        }

        // Since there is no global 'Users' table in the current schema (users are tied to merchants or other entities),
        // we will handle authentication based on hardcoded demo users for this gateway phase.
        
        let role = 'User';
        let name = 'Demo User';

        if (email === 'superadmin@pgx.com') {
            role = 'Super Admin';
            name = 'System Admin';
        } else if (email === 'merchant@pgx.com') {
            role = 'Merchant';
            name = 'Test Merchant';
        } else if (email === 'user@pgx.com') {
            role = 'User';
            name = 'Playground Player';
        } else {
            return sendResponse(res, 401, false, 'Invalid credentials');
        }

        if (password !== 'admin123' && password !== 'password123') {
            return sendResponse(res, 401, false, 'Invalid credentials');
        }

        // Generate a mock JWT for now
        const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_token_${Date.now()}`;

        return sendResponse(res, 200, true, 'Login successful', {
            token,
            user: {
                name,
                email,
                role
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};
