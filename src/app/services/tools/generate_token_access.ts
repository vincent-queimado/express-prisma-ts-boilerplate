import jwt from 'jsonwebtoken';
import config from '../../../config/server';

export default async (id: number, name: string, email: string, avatar: string) => {
    const conf = config[process.env.NODE_ENV];

    const token = jwt.sign(
        {
            id,
            name,
            email,
            avatar,
        },
        conf.jwt.secret,
        {
            expiresIn: conf.jwt.expiredIn,
        },
    );

    return { success: true, data: token, error: null };
};
