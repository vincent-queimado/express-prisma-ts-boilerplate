import bcrypt from 'bcryptjs';

export default async (password: string) => {
    const saltRounds = 10;

    if (!password) {
        return { success: false, data: null, error: 'Error to hash password. Data missing' };
    }

    const hashPassword = bcrypt.hashSync(password, saltRounds);

    if (!bcrypt.compareSync(password, hashPassword)) {
        return {
            success: false,
            data: null,
            error: 'Error to hash password. Invalid credentials.',
        };
    }

    return { success: true, data: hashPassword, error: null };
};
