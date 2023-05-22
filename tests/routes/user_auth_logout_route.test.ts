import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK USER AUTH API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        jest.setTimeout(60000);

        const silent = true;
        app = await server(silent);
    });

    it('CHECK USER LOGOUT', async () => {
        // Logout successfully
        await request(app)
            .get(`${apiPath}/auth/logout`)
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
