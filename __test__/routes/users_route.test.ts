import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK USERS API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it(`GET ${apiPath}/admin/users`, async () => {
        await request(app)
            .get(`${apiPath}/admin/users`)
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
