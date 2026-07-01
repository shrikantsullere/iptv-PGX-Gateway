const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all fraud alerts
 */
const getFraudAlerts = async (req, res, next) => {
    try {
        const alerts = await prisma.fraud_alerts.findMany({
            orderBy: { timestamp: 'desc' }
        });
        return sendResponse(res, 200, true, 'Fraud alerts fetched', alerts);
    } catch (error) {
        next(error);
    }
};

/**
 * Resolve fraud alert
 */
const resolveFraudAlert = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const updated = await prisma.fraud_alerts.update({
            where: { alertId: id },
            data: { status, resolutionNotes: notes }
        });

        return sendResponse(res, 200, true, 'Fraud alert resolved', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Trigger fraud investigation
 */
const triggerInvestigation = async (req, res, next) => {
    try {
        const payload = req.body;
        // Mock investigation logic
        return sendResponse(res, 201, true, 'Fraud investigation triggered', payload);
    } catch (error) {
        next(error);
    }
};

/**
 * Get risk incidents
 */
const getRiskIncidents = async (req, res, next) => {
    try {
        const incidents = await prisma.risk_incidents.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Risk incidents fetched', incidents);
    } catch (error) {
        next(error);
    }
};

/**
 * Create risk incident
 */
const createRiskIncident = async (req, res, next) => {
    try {
        const { merchantId, severity, description } = req.body;
        
        const incident = await prisma.risk_incidents.create({
            data: {
                merchantId,
                severity: severity || 'Medium',
                description,
                status: 'Open',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        
        return sendResponse(res, 201, true, 'Risk incident created', incident);
    } catch (error) {
        next(error);
    }
};

/**
 * Get blocked entities
 */
const getBlockedEntities = async (req, res, next) => {
    try {
        const entities = await prisma.blocked_entities.findMany({
            orderBy: { blockedAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Blocked entities fetched', entities);
    } catch (error) {
        next(error);
    }
};

/**
 * Unblock an entity
 */
const unblockEntity = async (req, res, next) => {
    try {
        const { entityId } = req.params;
        const { unblockReason } = req.body;

        const unblocked = await prisma.blocked_entities.update({
            where: { entityId },
            data: { 
                status: 'Unblocked',
                unblockedAt: new Date(),
                unblockReason
            }
        });

        return sendResponse(res, 200, true, 'Entity unblocked successfully', unblocked);
    } catch (error) {
        next(error);
    }
};

/**
 * Get block policies (rules)
 */
const getBlockPolicies = async (req, res, next) => {
    try {
        const policies = await prisma.block_policies.findMany();
        return sendResponse(res, 200, true, 'Block policies fetched', policies);
    } catch (error) {
        next(error);
    }
};

/**
 * Update block policy
 */
const updateBlockPolicy = async (req, res, next) => {
    try {
        const { policyId } = req.params;
        const payload = req.body;

        const updated = await prisma.block_policies.update({
            where: { policyId },
            data: { ...payload }
        });

        return sendResponse(res, 200, true, 'Block policy updated', updated);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFraudAlerts,
    resolveFraudAlert,
    triggerInvestigation,
    getRiskIncidents,
    createRiskIncident,
    getBlockedEntities,
    unblockEntity,
    getBlockPolicies,
    updateBlockPolicy
};
