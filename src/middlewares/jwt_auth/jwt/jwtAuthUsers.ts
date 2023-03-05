import jwt from 'jsonwebtoken';
import config from '../../../config/server.js';
import httpMsg from '../../../utils/http_handler/http_msg.js';
import userExist from '../../../app/services/accounts/_exist.js';

const conf = config[process.env.NODE_ENV];

export default async (req) => {
    const authHeader = await req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let user;

    if (!token) return httpMsg.http401('Invalid token');

    const verified = await verifyToken(token);

    if (verified.error) return httpMsg.http401('Invalid token');

    if (verified.payload) {
        user = {
            id: verified.payload.id,
            name: verified.payload.name,
            email: verified.payload.email,
            avatar: verified.payload.avatar,
        };
    }

    // Check existing User
    const exist = await await userExist(verified.payload.id);
    if (!exist.data) {
        return httpMsg.http401('Invalid token');
    }

    return { success: true, data: user };
};

const verifyToken = (token) => {
    const result = jwt.verify(token, conf.session.secret, (err, decoded) => {
        if (err) {
            return { error: err.message || err, payload: null };
        }
        return { error: null, payload: decoded };
    });
    return result;
};
