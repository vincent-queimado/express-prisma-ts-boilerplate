import generateTokenAccess from '../../src/functions/generate_token_access';

describe('CHECK GENERATE TOKEN ACCESS', () => {
    it('CHECK GENERATE TOKEN ACCESS', async () => {
        const id = 'a943dcfc-d716-42ea-81b1-0d931e72abeb';
        const name = 'johndoe';
        const email = 'johndoe.sample@gmail.com';
        const avatar = '';

        const res = await generateTokenAccess(id, name, email, avatar);

        expect(res).toEqual(
            expect.objectContaining({
                success: true,
                error: null,
            }),
        );
    });
});
