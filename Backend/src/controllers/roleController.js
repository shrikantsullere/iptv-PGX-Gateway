const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Get all roles
 */
const getRoles = async (req, res, next) => {
    try {
        const roles = await prisma.roles.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return sendResponse(res, 200, true, 'Roles fetched', roles);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new role
 */
const createRole = async (req, res, next) => {
    try {
        const { roleName, description, permissions, riskProfile } = req.body;
        
        if (!roleName) return sendResponse(res, 400, false, 'Role name is required');

        const newRole = await prisma.roles.create({
            data: {
                roleName,
                description: description || '',
                riskProfile: riskProfile || 'Low',
                permissions: permissions || ['read'],
                status: 'Active',
                createdBy: 'System',
                createdAt: new Date()
            }
        });

        return sendResponse(res, 201, true, 'Role created successfully', newRole);
    } catch (error) {
        next(error);
    }
};

/**
 * Update role permissions
 */
const updateRole = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const payload = req.body;

        const updated = await prisma.roles.update({
            where: { roleId },
            data: { ...payload }
        });

        return sendResponse(res, 200, true, 'Role updated successfully', updated);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a role
 */
const deleteRole = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        await prisma.roles.delete({
            where: { roleId }
        });
        return sendResponse(res, 200, true, 'Role deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getRoles,
    createRole,
    updateRole,
    deleteRole
};
