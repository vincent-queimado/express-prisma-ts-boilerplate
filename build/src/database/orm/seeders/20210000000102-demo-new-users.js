"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rand_token_1 = __importDefault(require("rand-token"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const table = 'users';
exports.default = {
    up: async (queryInterface) => {
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
                    id: (0, uuid_1.v4)(),
                    name: 'Vincent',
                    email: 'vincent.queimado@gmail.com',
                    phone: `8198877000${i}`,
                    accountName: 'Vincent',
                    accountLocationState: 'PE',
                    password: bcryptjs_1.default.hashSync('1234', 10),
                    signupConfirmationComplete: true,
                    signupConfirmationToken: rand_token_1.default.suid(16),
                    resetPasswordToken: rand_token_1.default.suid(16),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            else {
                accounts.push({
                    id: (0, uuid_1.v4)(),
                    name: i ? `account${i}` : `Account`,
                    email: i ? `account${i}@melibee.com.br` : `account@melibee.com.br`,
                    phone: i ? `8198888999${i}` : `81988889999`,
                    accountName: i ? `account${i}` : `Account`,
                    accountLocationState: states[Math.floor(Math.random() * states.length)],
                    password: bcryptjs_1.default.hashSync('12341234', 10),
                    signupConfirmationComplete: true,
                    signupConfirmationToken: rand_token_1.default.suid(16),
                    resetPasswordToken: rand_token_1.default.suid(16),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        }
        await queryInterface.bulkInsert(table, accounts);
    },
    down: (queryInterface) => queryInterface.bulkDelete(table, null, {}),
};
