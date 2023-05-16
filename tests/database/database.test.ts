import db from '../../src/database/db_connection';

describe('CHECK DATABASE', () => {
    it('CHECK DATABASE CONNECTION', async () => {
        const res = await db.checkConnection();
        expect(res).toMatchObject({ success: true, error: null });
    });
});
