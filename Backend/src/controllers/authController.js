const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendResponse(res, 400, false, 'Email and password are required');
        }

        // Query the real Users table from the database
        const user = await prisma.users.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return sendResponse(res, 401, false, 'Invalid credentials');
        }

        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return sendResponse(res, 401, false, 'Invalid credentials');
        }

        const jwt = require('jsonwebtoken');
        // Generate a real JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key_123',
            { expiresIn: '24h' }
        );

        return sendResponse(res, 200, true, 'Login successful', {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};
