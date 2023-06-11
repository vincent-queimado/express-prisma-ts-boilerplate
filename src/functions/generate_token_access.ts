import jwt from 'jsonwebtoken';
import config from '@config/app';

export default async (tokenData: object) => {
    const token = jwt.sign(tokenData, config.jwt.secretUser, {
        expiresIn: config.jwt.expiredIn,
    });

    return { success: true, data: token, error: null };
};
