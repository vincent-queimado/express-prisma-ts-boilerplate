import request from 'supertest';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';
import server from '../../src/server/http_server';
import getUser from '../../src/dao/users/user_get_one_dao';
import createUser from '../../src/dao/users/user_create_dao';
import deleteUser from '../../src/dao/users/user_delete_dao';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();
const saltRounds = config.bcrypt.saltRounds;

describe('CHECK USER ME API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        jest.setTimeout(60000);

        const silent = true;
        app = await server(silent);
    });

    it('CHECK USER SHOW ME', async () => {
        let token = null;
        const password = '12341234';
        const wrongToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ5.eyJpZCI6ImYxYmI0NmNiLTYxY2QtNDVmYy05OGNiLTM2ZWM4ZGI1YTNlMSIsIm5hbWUiOiJKb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQHNhbXBsZS5jb20iLCJhdmF0YXIiOm51bGwsImlhdCI6MTY4NDc4MzU3NCwiZXhwIjoxNjg0ODY5OTc0fQ.MUX_HpyoUtQJyuCwosoJypJZeNhtCbCKIg5ntM_e_58';

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
        const user = await getUser({ email: createPayload.email }, { id: true });

        if (user.data) {
            await deleteUser(createPayload.email);
        }

        // Create User
        await createUser(createPayload, { id: true });

        // Check new user
        await getUser({ email: createPayload.email }, { id: true });

        // Authorized Login
        await request(app)
            .post(`${apiPath}/client/auth/login`)
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

        // Show me with correct token
        await request(app)
            .get(`${apiPath}/client/user/me`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        // Show me with incorrect token
        await request(app)
            .get(`${apiPath}/client/user/me`)
            .set('Authorization', `Bearer ${wrongToken}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Show me without token
        await request(app)
            .get(`${apiPath}/client/user/me`)
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

        // Show me with correct token but user not exist
        await request(app)
            .get(`${apiPath}/client/user/me`)
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
