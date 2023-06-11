import bcrypt from 'bcryptjs';

export default async (plainPassword: string, hashPassword: string) => {
    if (!bcrypt.compareSync(plainPassword, hashPassword)) {
        return {
            success: false,
            data: null,
            error: 'Error to check password. Invalid credentials.',
        };
    }

    return { success: true, data: plainPassword, error: null };
};
