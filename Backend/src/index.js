require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

// Route Imports
const dashboardRoutes = require('./routes/dashboardRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const settlementRoutes = require('./routes/settlementRoutes');
const walletRoutes = require('./routes/walletRoutes');
const processorRoutes = require('./routes/processorRoutes');
const kycRoutes = require('./routes/kycRoutes');
const riskRoutes = require('./routes/riskRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const roleRoutes = require('./routes/roleRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const whitelabelRoutes = require('./routes/whitelabelRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const supportRoutes = require('./routes/supportRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/', (req, res) => {
    res.json({ success: true, message: 'PGX Gateway API is running flawlessly' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/merchants', merchantRoutes);
app.use('/api/admin/transactions', transactionRoutes);
app.use('/api/admin/revenue', revenueRoutes);
app.use('/api/admin/settlements', settlementRoutes);
app.use('/api/admin/wallets', walletRoutes);
app.use('/api/admin/payment-processors', processorRoutes);
app.use('/api/admin/kyc', kycRoutes);
app.use('/api/admin/risk', riskRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/admin/roles', roleRoutes);
app.use('/api/admin/webhooks', webhookRoutes);
app.use('/api/admin/reports', reportRoutes);
app.use('/api/admin/whitelabel', whitelabelRoutes);
app.use('/api/admin/notifications', notificationRoutes);
app.use('/api/admin/support', supportRoutes);
app.use('/api/admin/audit-logs', auditLogRoutes);

// Merchant Portal Routes (Reusing same controllers for simplicity in this integration)
app.use('/api/merchant/dashboard', dashboardRoutes);
app.use('/api/merchant/transactions', transactionRoutes);
app.use('/api/merchant/settings', settingsRoutes);

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`[Server] PGX Gateway API is running on port ${PORT}`);
});
