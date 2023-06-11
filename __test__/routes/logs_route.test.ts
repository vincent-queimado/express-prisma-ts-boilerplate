import request from 'supertest';

import server from '../../src/server/http_server';
import globalApiPath from '../../src/utils/global_api_path/global_api_path';

const apiPath = globalApiPath();

describe('CHECK LOGS API ENDPOINTS', () => {
    let app: any;

    beforeAll(async () => {
        const silent = true;
        app = await server(silent);
    });

    it(`GET ${apiPath}/logs`, async () => {
        await request(app).get(`${apiPath}/logs`).expect(301);
    });

    afterAll(async () => {
        await app.close();
    });
});
