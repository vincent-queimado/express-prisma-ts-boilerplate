import { v4 as uuidv4 } from 'uuid';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

const table = 'users';

export default {
    up: async (queryInterface: any) => {
        const accountQty = 9;
        const accounts = [];

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

        for (let i = 0; i <= accountQty; i += 1) {
            if (!i) {
                accounts.push({
                    id: uuidv4(),
                    name: 'Vincent',
                    email: 'vincent.queimado@gmail.com',
                    phone: `8198877000${i}`,
                    accountName: 'Vincent',
                    accountLocationState: 'PE',
                    password: bcrypt.hashSync('1234', 10),
                    signupConfirmationComplete: true,
                    signupConfirmationToken: randtoken.suid(16),
                    resetPasswordToken: randtoken.suid(16),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            } else {
                accounts.push({
                    id: uuidv4(),
                    name: i ? `account${i}` : `Account`,
                    email: i ? `account${i}@melibee.com.br` : `account@melibee.com.br`,
                    phone: i ? `8198888999${i}` : `81988889999`,
                    accountName: i ? `account${i}` : `Account`,
                    accountLocationState: states[Math.floor(Math.random() * states.length)],
                    password: bcrypt.hashSync('12341234', 10),
                    signupConfirmationComplete: true,
                    signupConfirmationToken: randtoken.suid(16),
                    resetPasswordToken: randtoken.suid(16),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        }

        await queryInterface.bulkInsert(table, accounts);
    },

    down: (queryInterface: any) => queryInterface.bulkDelete(table, null, {}),
};
