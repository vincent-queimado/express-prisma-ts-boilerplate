import request from 'supertest';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';
import server from '../../src/server/http_server';
import getUser from '../../src/services/users/get_user_service';
import createUser from '../../src/services/users/create_user_service';
import deleteUser from '../../src/services/users/physical_delete_user_service';
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

    it('CHECK USER CONFIRM REGISTRATION', async () => {
        const password = '12341234';
        const wrongToken = '0CrT0an7NBY9cvLd0NYFa3mk';

        const createPayload = {
            email: 'johndoe-test-confirm@sample.com',
            name: 'johndoe-test-confirm',
            phone: '(81) 99999-9999',
            accountName: 'johndoe-test-confirm',
            accountLocationState: 'PE',
            password: bcrypt.hashSync(password, saltRounds),
            tokenOfRegisterConfirmation: randtoken.suid(16),
            tokenOfResetPassword: randtoken.suid(16),
            isRegistered: false,
        };

        // Check user and clean before new registration
        const user = await getUser(createPayload.email, 'email', { id: true }, false);

        if (user.data) {
            await deleteUser(createPayload.email);
        }

        // Create User
        await createUser(createPayload);

        // Check new user
        const newUser = await getUser(
            createPayload.email,
            'email',
            { id: true, email: true, tokenOfRegisterConfirmation: true },
            false,
        );

        // User try to confirm the registration with a wrong token
        await request(app)
            .get(`${apiPath}/auth/register/confirmation`)
            .query({
                email: createPayload.email,
                token: wrongToken,
            })
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // User successfully confirm the registration with right token
        await request(app)
            .get(`${apiPath}/auth/register/confirmation`)
            .query({
                email: createPayload.email,
                token: newUser.data.tokenOfRegisterConfirmation,
            })
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        // User is already registered
        await request(app)
            .get(`${apiPath}/auth/register/confirmation`)
            .query({
                email: newUser.data.email,
                token: newUser.data.tokenOfRegisterConfirmation,
            })
            .expect(422)
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
