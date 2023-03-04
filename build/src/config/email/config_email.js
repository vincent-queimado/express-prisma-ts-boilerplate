"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = (env) => {
    return {
        auth: {
            type: 'OAuth2',
        },
        smtp: {
            service: env.SMTP_SERVICE || 'gmail',
            user: env.SMTP_USER || 'admin',
            password: env.SMTP_PASSWORD || 'password',
        },
        oauth: {
            clientId: env.OAUTH_CLIENTID || '',
            clientSecret: env.OAUTH_CLIENT_SECRET || '',
            refreshToken: env.OAUTH_REFRESH_TOKEN || '',
        },
        debug: {
            debug: false,
            logger: false,
        },
    };
};
const stageConfig = (env) => {
    return {
        auth: {
            type: 'OAuth2',
        },
        smtp: {
            service: env.SMTP_SERVICE || 'gmail',
            user: env.SMTP_USER || 'admin',
            password: env.SMTP_PASSWORD || 'password',
        },
        oauth: {
            clientId: env.OAUTH_CLIENTID || '',
            clientSecret: env.OAUTH_CLIENT_SECRET || '',
            refreshToken: env.OAUTH_REFRESH_TOKEN || '',
        },
        debug: {
            debug: false,
            logger: false,
        },
    };
};
const prodConfig = (env) => {
    return {
        auth: {
            type: 'OAuth2',
        },
        smtp: {
            service: env.SMTP_SERVICE || 'gmail',
            user: env.SMTP_USER || 'admin',
            password: env.SMTP_PASSWORD || 'password',
        },
        oauth: {
            clientId: env.OAUTH_CLIENTID || '',
            clientSecret: env.OAUTH_CLIENT_SECRET || '',
            refreshToken: env.OAUTH_REFRESH_TOKEN || '',
        },
        debug: {
            debug: false,
            logger: false,
        },
    };
};
exports.default = { devConfig, stageConfig, prodConfig };
