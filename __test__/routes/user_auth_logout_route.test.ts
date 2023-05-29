import bcrypt from 'bcryptjs';
import request from 'supertest';
import randtoken from 'rand-token';

import config from '../../src/config/app';
import server from '../../src/server/http_server';
import getUser from '../../src/services/users/user_get_one_service';
import createUser from '../../src/services/users/user_create_service';
import deleteUser from '../../src/services/users/user_physical_delete_service';
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

    it('CHECK USER LOGOUT', async () => {
        let token = {};
        const password = '12341234';

        const createPayload = {
            email: 'johndoe-test-showme@sample.com',
            name: 'johndoe-test-showme',
            phone: '(81) 99999-9999',
            accountName: 'johndoe-test-showme',
            accountLocationState: 'PE',
            password: bcrypt.hashSync(password, saltRounds),
            tokenOfRegisterConfirmation: randtoken.suid(16),
            tokenOfResetPassword: randtoken.suid(16),
            isRegistered: true,
        };

        const payload = {
            email: createPayload.email,
            password,
        };

        // Check user and clean before new registration
        const user = await getUser(createPayload.email, 'email', { id: true }, false);

        if (user.data) {
            await deleteUser(createPayload.email);
        }

        // Create User
        await createUser(createPayload, { id: true });

        // Check new user
        await getUser(createPayload.email, 'email', { id: true }, false);

        // Authorized Login
        await request(app)
            .post(`${apiPath}/auth/login`)
            .send(payload)
            .expect(200)
            .then((response) => {
                if (response.body.success) token = response.body.content.token;
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                    }),
                );
            });

        // Logout successfully
        await request(app)
            .get(`${apiPath}/auth/logout`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.objectContaining({
                            token: null,
                        }),
                    }),
                );
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
