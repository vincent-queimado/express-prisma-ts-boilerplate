import request from 'supertest';

import server from '../../src/server/http_server';

describe('CHECK LOGS API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it('GET /v1/logs', async () => {
        await request(app).get('/v1/logs').expect(301);
    });

    afterAll(async () => {
        await app.close();
    });
});
