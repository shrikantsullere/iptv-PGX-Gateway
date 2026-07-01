// Prisma handles the actual database models in schema.prisma.
// This is a structural wrapper file as defined in the project architecture.
const prisma = require('../utils/prismaClient');
module.exports = prisma;
