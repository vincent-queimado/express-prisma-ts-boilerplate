import bcrypt from 'bcryptjs';

export default async (password: string) => {
    const saltRounds = 10;

    const hashPassword = bcrypt.hashSync(password, saltRounds);

    return { success: true, data: hashPassword, error: null };
};
