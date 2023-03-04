"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = (env) => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || true,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};
const stageConfig = (env) => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || false,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};
const prodConfig = (env) => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || false,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};
exports.default = { devConfig, stageConfig, prodConfig };
