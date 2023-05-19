import request from 'supertest';

import server from '../../src/server/http_server';

describe('CHECK USERS API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it('GET /v1/users', async () => {
        await request(app)
            .get('/v1/users')
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
