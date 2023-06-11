import generateTokenAccess from '../../src/functions/generate_token_access';

describe('CHECK GENERATE TOKEN ACCESS', () => {
    it('CHECK GENERATE TOKEN ACCESS', async () => {
        const tokenData = {
            id: 'a943dcfc-d716-42ea-81b1-0d931e72abeb',
            name: 'johndoe',
            email: 'johndoe.sample@gmail.com',
            avatar: '',
        };

        const res = await generateTokenAccess(tokenData);

        expect(res).toEqual(
            expect.objectContaining({
                success: true,
                error: null,
            }),
        );
    });
});
