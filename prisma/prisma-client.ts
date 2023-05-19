import { PrismaClient } from '@prisma/client';

interface CustomNodeJsGlobal extends Global {
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    global.prisma = prisma;
}

export default prisma;
