import request from 'supertest';
import randtoken from 'rand-token';

import server from '../../src/server/http_server';
import getUser from '../../src/services/users/get_user_service';
import createUser from '../../src/services/users/create_user_service';
import deleteUser from '../../src/services/users/physical_delete_user_service';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

const payload = {
    email: 'johndoe-test@sample.com',
    name: 'johndoe-test',
    phone: '(81) 99999-9999',
    accountName: 'johndoe-test',
    accountLocationState: 'PE',
    password: '12341234',
    tokenOfRegisterConfirmation: randtoken.suid(16),
    tokenOfResetPassword: randtoken.suid(16),
};

const wrongToken = '0CrT0an7NBY9cvLd0NYFa3mk';

describe('CHECK USER AUTH API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);

        const user = await getUser(
            payload.email,
            'email',
            ['password', 'tokenOfResetPassword'],
            false,
        );

        if (user.data) {
            await deleteUser(payload.email);
        }
    });

    it('USER REGISTER SUCCESS TEST', async () => {
        jest.setTimeout(30000);

        // User successfully registered
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(payload)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        // Update user successfully if have not confirm registration
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(payload)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        const user = await getUser(
            payload.email,
            'email',
            ['password', 'tokenOfResetPassword'],
            false,
        );

        // User try to confirm the registration with a wrong token
        await request(app)
            .get(`${apiPath}/auth/register/confirmation`)
            .query({
                email: payload.email,
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
                email: payload.email,
                token: user.data.tokenOfRegisterConfirmation,
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
                email: user.data.email,
                token: user.data.tokenOfRegisterConfirmation,
            })
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Try to register the same user after a confirmation
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(payload)
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        await deleteUser(payload.email);
    });

    afterAll(async () => {
        await app.close();
    });
});
