import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

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

        const user = {
            name: 'johndoe',
            email: 'johndoe@sample.com',
            password: 'Johndoe@1234',
        };

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
            .patch(`${apiPath}/client/user/me`)
            .set('Authorization', `Bearer ${token}`)
            .send(user)
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
