import { IEnvConfig, IProcessEnv } from './types';

const testConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        api: {
            version: env.API_VERSION || 'v1',
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || true,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};

const devConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        api: {
            version: env.API_VERSION || 'v1',
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || true,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};

const stageConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        api: {
            version: env.API_VERSION || 'v1',
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || false,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};

const prodConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        api: {
            version: env.API_VERSION || 'v1',
        },
        jwt: {
            secret: env.API_JWT_SECRET || 'jwtsecretword',
            expiredIn: env.API_JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || false,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};

export default { testConfig, devConfig, stageConfig, prodConfig };
