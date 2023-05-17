import generateHashPassword from '../../src/functions/generate_hash_password';

describe('CHECK HASH PASSWORD', () => {
    it('CHECK GENERATE HASH PASSWORD', async () => {
        const plainPassword = 'Johndoe@1234';

        const res = await generateHashPassword(plainPassword);
        expect(res).toEqual(
            expect.objectContaining({
                success: true,
                error: null,
            }),
        );
    });
});
