import request from 'supertest';

import server from '../../src/server/http_server';

describe('CHECK DEFAULT API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it('GET /', async () => {
        await request(app).get('/').expect(302);
    });

    it('GET /v1', async () => {
        await request(app).get('/v1').expect(302);
    });

    it('GET /v1/info', async () => {
        await request(app)
            .get('/v1/info')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: 'Sucesso',
                        content: expect.any(Object),
                    }),
                );
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
