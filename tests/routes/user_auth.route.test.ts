import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK USER AUTH API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it(`POST ${apiPath}/auth/register`, async () => {
        const payload = {
            email: 'johndoe-test@sample.com',
            name: 'johndoe-test',
            phone: '(81) 99999-9999',
            accountName: 'johndoe-test',
            accountLocationState: 'PE',
            password: '12341234',
        };

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
    });

    afterAll(async () => {
        await app.close();
    });
});
