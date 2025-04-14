import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';

const prisma = new PrismaClient();


async function main() {
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        /* eslint-disable no-console */
        console.error(err);
        /* eslint-enable no-console */
        await prisma.$disconnect();
        process.exit(1);
    });
