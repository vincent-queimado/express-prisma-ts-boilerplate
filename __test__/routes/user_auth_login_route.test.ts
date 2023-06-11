import request from 'supertest';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';
import server from '../../src/server/http_server';
import getUser from '../../src/dao/users/user_get_one_dao';
import createUser from '../../src/dao/users/user_create_dao';
import updateUser from '../../src/dao/users/user_update_dao';
import deleteUser from '../../src/dao/users/user_delete_dao';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();
const saltRounds = config.bcrypt.saltRounds;

describe('CHECK USER AUTH API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        jest.setTimeout(60000);

        const silent = true;
        app = await server(silent);
    });

    it('CHECK USER LOGIN', async () => {
        const password = '12341234';
        const wrongEmail = 'johndoe-test-login-wrong@sample.com';
        const wrongPassword = '43210';

        const createPayload = {
            email: 'johndoe-test-login@sample.com',
            name: 'johndoe-test-login',
            phone: '(81) 99999-9999',
            accountName: 'johndoe-test-login',
            accountLocationState: 'PE',
            password: bcrypt.hashSync(password, saltRounds),
            tokenOfRegisterConfirmation: randtoken.suid(16),
            tokenOfResetPassword: randtoken.suid(16),
            isRegistered: false,
        };

        const loginPayload = {
            email: createPayload.email,
            password: password,
        };

        // Check user and clean before new registration
        const user = await getUser({ email: createPayload.email }, { id: true });

        if (user.data) {
            await deleteUser(createPayload.email);
        }

        // Create User
        await createUser(createPayload, { id: true });

        // Check new user
        const newUser = await getUser({ email: createPayload.email }, { id: true });

        // Unauthorized Login because not confirm registration
        await request(app)
            .post(`${apiPath}/client/auth/login`)
            .send(loginPayload)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Update User with confirm registration
        await updateUser(newUser.data.id, { isRegistered: true }, { id: true });

        // Authorized Login after confirm registration
        await request(app)
            .post(`${apiPath}/client/auth/login`)
            .send(loginPayload)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                    }),
                );
            });

        // Unauthorized Login with wrong password
        await request(app)
            .post(`${apiPath}/client/auth/login`)
            .send({
                email: createPayload.email,
                password: wrongPassword,
            })
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Unauthorized Login with unknow email
        await request(app)
            .post(`${apiPath}/client/auth/login`)
            .send({
                email: wrongEmail,
                password: password,
            })
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Delete User
        await deleteUser(createPayload.email);
    });

    afterAll(async () => {
        await app.close();
    });
});
