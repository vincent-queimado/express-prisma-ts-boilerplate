import servHashPassword from 'src/functions/generate_hash_password';

export default async () => {
    const passwordLength = 8;
    const password = Math.random().toString(36).slice(-passwordLength);

    if (password.toString().length !== passwordLength) {
        return { success: false, data: null, error: 'Error generate password' };
    }

    const resultHashPassword = await servHashPassword(password);
    if (!resultHashPassword.success || !resultHashPassword.data) {
        return { success: false, data: null, error: 'Eror to hash password' };
    }

    return { success: true, data: resultHashPassword.data, error: null };
};
