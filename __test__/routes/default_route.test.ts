import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK DEFAULT API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it('GET /', async () => {
        await request(app).get('/').expect(500);
    });

    it(`GET ${apiPath}`, async () => {
        await request(app).get(`${apiPath}`).expect(302);
    });

    it(`GET ${apiPath}/info`, async () => {
        await request(app)
            .get(`${apiPath}/info`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: 'Success',
                        content: expect.any(Object),
                    }),
                );
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
