import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';

const prisma = new PrismaClient();
const saltRounds = config.bcrypt.saltRounds;

const userQty = 9;
const users: any = [];

const states = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
];

async function main() {
    for (let i = 0; i <= userQty; i += 1) {
        if (!i) {
            users.push({
                id: uuidv4(),
                name: 'johndoe',
                email: 'johndoe@sample.com',
                phone: `81999999999`,
                accountName: 'johndoe',
                accountLocationState: 'PE',
                password: bcrypt.hashSync('Johndoe@1234', saltRounds),
                isRegistered: true,
                tokenOfRegisterConfirmation: randtoken.suid(16),
                tokenOfResetPassword: randtoken.suid(16),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        } else {
            users.push({
                id: uuidv4(),
                name: `johndoe.sample${i}`,
                email: `johndoe.sample${i}@smaple.com`,
                phone: `8199999999${i}`,
                accountName: `account${i}`,
                accountLocationState: states[Math.floor(Math.random() * states.length)],
                password: bcrypt.hashSync('Johndoe@1234', saltRounds),
                isRegistered: true,
                tokenOfRegisterConfirmation: randtoken.suid(16),
                tokenOfResetPassword: randtoken.suid(16),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
    }

    await prisma.user.createMany({
        data: users,
    });
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
