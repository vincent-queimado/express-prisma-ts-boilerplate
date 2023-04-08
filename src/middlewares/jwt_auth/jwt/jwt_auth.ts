import jwt from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../../config/app/_index';
import httpMsg from '../../../utils/http_messages/http_msg';

export default async (req: Request) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let user;

    if (!token) return httpMsg.http401('Invalid token');

    const verified = verifyToken(token);

    if (verified.error) return httpMsg.http401('Invalid token');

    if (verified.payload) {
        user = {
            id: verified.payload.id,
            name: verified.payload.name,
            email: verified.payload.email,
            avatar: verified.payload.avatar,
        };
    }

    return { success: true, data: user };
};

const verifyToken = (token: string) => {
    const result: any = jwt.verify(token, config.jwt.secret, (err: any, decoded: any) => {
        const res: any = {};

        if (err) {
            res.error = err.message;
            res.payload = null;
            return res;
        }

        res.error = err.message;
        res.payload = decoded;
        return res;
    });

    return result;
};
