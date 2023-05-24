import generatePassword from '../../src/functions/generate_password';

describe('CHECK GENERATE PASSWORD', () => {
    it('CHECK GENERATE PASSWORD', async () => {
        const res = await generatePassword();

        expect(res).toEqual(
            expect.objectContaining({
                success: true,
                error: null,
            }),
        );
    });
});
