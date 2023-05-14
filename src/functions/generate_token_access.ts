import jwt from 'jsonwebtoken';
import config from '@config/app';

export default async (id: string, name: string, email: string, avatar: string) => {
    const token = jwt.sign(
        {
            id,
            name,
            email,
            avatar,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiredIn,
        },
    );

    return { success: true, data: token, error: null };
};
