import { IEnvConfig, IProcessEnv } from './types';

const testConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
            ssl: env.APP_URL_SSL == 'true' || false,
        },
        api: {
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        jwt: {
            secret: env.JWT_SECRET || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
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
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        jwt: {
            secret: env.JWT_SECRET || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
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
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        jwt: {
            secret: env.JWT_SECRET || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
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
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        jwt: {
            secret: env.JWT_SECRET || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
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
