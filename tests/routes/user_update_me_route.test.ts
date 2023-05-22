import request from 'supertest';
import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

import config from '../../src/config/app';
import server from '../../src/server/http_server';
import getUser from '../../src/services/users/get_user_service';
import createUser from '../../src/services/users/create_user_service';
import updateUser from '../../src/services/users/update_user_service';
import deleteUser from '../../src/services/users/physical_delete_user_service';
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

    it('CHECK USER UPDATE ME', async () => {
        let token = null;

        const payload = {
            email: 'johndoe@sample.com',
            password: 'Johndoe@1234',
        };

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

        await request(app)
            .patch(`${apiPath}/user/me`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Johndoe' })
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        content: expect.any(Object),
                    }),
                );
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
