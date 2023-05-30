import request from 'supertest';
import randtoken from 'rand-token';

import server from '../../src/server/http_server';
import getUser from '../../src/services/users/user_get_one_service';
import updateUser from '../../src/services/users/user_update_service';
import deleteUser from '../../src/services/users/user_physical_delete_service';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK USER AUTH API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        jest.setTimeout(60000);

        const silent = true;
        app = await server(silent);
    });

    it('CHECK USER REGISTER', async () => {
        const registerPayload = {
            email: 'johndoe-tes-register@sample.com',
            name: 'johndoe-test-register',
            phone: '(81) 99999-9999',
            accountName: 'johndoe-test-register',
            accountLocationState: 'PE',
            password: '12341234',
            tokenOfRegisterConfirmation: randtoken.suid(16),
            tokenOfResetPassword: randtoken.suid(16),
        };

        // Check user and clean before new registration
        const user = await getUser(registerPayload.email, 'email', { id: true }, false);

        if (user.data) {
            await deleteUser(registerPayload.email);
        }

        // User successfully registered
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(registerPayload)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        // User successfully overwrite old registered without confirm registration
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(registerPayload)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });

        // Update User with confirm registration
        const newUser = await getUser(registerPayload.email, 'email', { id: true }, false);
        await updateUser(newUser.data.id, { isRegistered: true }, { id: true });

        // Try to register the same user after confirm registration
        await request(app)
            .post(`${apiPath}/auth/register`)
            .send(registerPayload)
            .expect(422)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: false,
                    }),
                );
            });

        // Delete User
        await deleteUser(registerPayload.email);
    });

    afterAll(async () => {
        await app.close();
    });
});