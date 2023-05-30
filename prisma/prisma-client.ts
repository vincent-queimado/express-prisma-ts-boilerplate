import { PrismaClient } from '@prisma/client';
import config from '@config/app';

interface CustomNodeJsGlobal extends Global {
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

// const prisma = global.prisma || new PrismaClient({ log: ['info'] });
const prisma = global.prisma || new PrismaClient();

if (!config.isProd) {
    global.prisma = prisma;
}

export default prisma;
