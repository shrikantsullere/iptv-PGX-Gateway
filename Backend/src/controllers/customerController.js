const prisma = require('../utils/prismaClient');
const { sendResponse } = require('../utils/responseHandler');

const getCustomers = async (req, res, next) => {
    try {
        let customers = await prisma.customers.findMany({
            orderBy: { createdAt: 'desc' }
        });

        if (customers.length === 0) {
            // Seed default customers
            const defaultCustomers = Array(15).fill(null).map((_, i) => ({
                merchantId: 'MER-CURRENT',
                name: ['John Smith', 'Sarah Jones', 'Michael Brown', 'Emma Wilson', 'David Lee'][Math.floor(Math.random() * 5)],
                email: `user${1000 + i}@example.com`,
                ltv: Number((Math.random() * 5000 + 100).toFixed(2)),
                txCount: Math.floor(Math.random() * 50 + 1),
                risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                joined: new Date(Date.now() - Math.random() * 50000000000),
            }));
            await prisma.customers.createMany({ data: defaultCustomers });
            customers = await prisma.customers.findMany({ orderBy: { createdAt: 'desc' } });
        }

        // Map id -> CUST-uuid short format if needed, but frontend can just use uuid
        const mappedCustomers = customers.map(c => ({
            ...c,
            // Provide a shorter display ID for the frontend like CUST-1000
            displayId: `CUST-${c.id.split('-')[0].toUpperCase()}`,
            joined: new Date(c.joined).toLocaleDateString('en-GB') // enforces DD/MM/YYYY
        }));

        return sendResponse(res, 200, true, 'Customers fetched successfully', mappedCustomers);
    } catch (error) {
        next(error);
    }
};

const parseDate = (d) => {
    if (!d) return undefined;
    let dateObj = new Date(d);
    if (!isNaN(dateObj)) return dateObj;
    
    // Try DD/MM/YYYY parsing
    const parts = d.split('/');
    if (parts.length === 3) {
        const fallback = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        if (!isNaN(fallback)) return fallback;
    }
    return new Date(); // default fallback
};

const createCustomer = async (req, res, next) => {
    try {
        const { name, email, ltv, txCount, risk, joined } = req.body;
        if (!name || !email) {
            return sendResponse(res, 400, false, 'Name and email are required');
        }

        const newCustomer = await prisma.customers.create({
            data: {
                merchantId: 'MER-CURRENT',
                name,
                email,
                ltv: ltv ? Number(ltv) : 0,
                txCount: txCount ? Number(txCount) : 0,
                risk: risk || 'Low',
                joined: parseDate(joined) || new Date(),
            }
        });

        newCustomer.displayId = `CUST-${newCustomer.id.split('-')[0].toUpperCase()}`;
        newCustomer.joined = new Date(newCustomer.joined).toLocaleDateString('en-GB');

        return sendResponse(res, 201, true, 'Customer created successfully', newCustomer);
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, ltv, txCount, risk, joined } = req.body;

        const updatedCustomer = await prisma.customers.update({
            where: { id },
            data: {
                name,
                email,
                ltv: ltv ? Number(ltv) : undefined,
                txCount: txCount ? Number(txCount) : undefined,
                risk,
                joined: joined ? parseDate(joined) : undefined,
            }
        });

        updatedCustomer.displayId = `CUST-${updatedCustomer.id.split('-')[0].toUpperCase()}`;
        updatedCustomer.joined = new Date(updatedCustomer.joined).toLocaleDateString('en-GB');

        return sendResponse(res, 200, true, 'Customer updated successfully', updatedCustomer);
    } catch (error) {
        if (error.code === 'P2025') {
            return sendResponse(res, 404, false, 'Customer not found');
        }
        next(error);
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.customers.delete({
            where: { id }
        });
        return sendResponse(res, 200, true, 'Customer deleted successfully');
    } catch (error) {
        if (error.code === 'P2025') {
            return sendResponse(res, 404, false, 'Customer not found');
        }
        next(error);
    }
};

module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
