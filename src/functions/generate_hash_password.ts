import bcrypt from 'bcryptjs';
import config from '@config/app';

export default async (password: string) => {
    const saltRounds = config.bcrypt.saltRounds;

    const hashPassword = bcrypt.hashSync(password, saltRounds);

    return { success: true, data: hashPassword, error: null };
};
