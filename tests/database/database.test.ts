import db from '../../src/database/db_connection';

describe('CHECK DATABASE', () => {
    it('CHECK SUCCESS DATABASE CONNECTION', async () => {
        const res = await db.checkConnection();
        expect(res).toMatchObject({ success: true, error: null });
    });

    it('CHECK FAIL DATABASE CONNECTION', async () => {
        const wrongUrl = 'postgresql://test:test@localhost:5432/test?schema=public';

        process.env.DATABASE_URL = wrongUrl;

        const res = await db.checkConnection();
        expect(res).toMatchObject({ success: false });
    });
});
