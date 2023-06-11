import { IEnvConfig, IProcessEnv } from './types';

const testConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        app: {
            host: env.APP_URL_HOST || 'localhost',
            port: (env.APP_URL_PORT && parseInt(env.APP_URL_PORT, 10)) || 10030,
        },
        ssl: {
            isHttps: env.SSL_ALLOW == 'true' || false,
            privateKey: env.SSL_PRIVATE_KEY || '',
            certificate: env.SSL_CERTIFICATE || '',
        },
        api: {
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        cors: {
            allowOrigin: env.CORS_ALLOW_ORIGIN || '*',
        },
        jwt: {
            secretUser: env.JWT_SECRET_USER || '',
            secretAdmin: env.JWT_SECRET_ADMIN || '',
            secretApp: env.JWT_SECRET_APP || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        ratelimiter: {
            max: env.RATE_LIMIT_MAX || '100',
            window: env.RATE_LIMIT_WINDOW || '15',
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
        },
        ssl: {
            isHttps: env.SSL_ALLOW == 'true' || false,
            privateKey: env.SSL_PRIVATE_KEY || '',
            certificate: env.SSL_CERTIFICATE || '',
        },
        api: {
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        cors: {
            allowOrigin: env.CORS_ALLOW_ORIGIN || '*',
        },
        jwt: {
            secretUser: env.JWT_SECRET_USER || '',
            secretAdmin: env.JWT_SECRET_ADMIN || '',
            secretApp: env.JWT_SECRET_APP || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        ratelimiter: {
            max: env.RATE_LIMIT_MAX || '100',
            window: env.RATE_LIMIT_WINDOW || '15',
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
        },
        ssl: {
            isHttps: env.SSL_ALLOW == 'true' || false,
            privateKey: env.SSL_PRIVATE_KEY || '',
            certificate: env.SSL_CERTIFICATE || '',
        },
        api: {
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        cors: {
            allowOrigin: env.CORS_ALLOW_ORIGIN || '*',
        },
        jwt: {
            secretUser: env.JWT_SECRET_USER || '',
            secretAdmin: env.JWT_SECRET_ADMIN || '',
            secretApp: env.JWT_SECRET_APP || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        ratelimiter: {
            max: env.RATE_LIMIT_MAX || '100',
            window: env.RATE_LIMIT_WINDOW || '15',
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
        },
        ssl: {
            isHttps: env.SSL_ALLOW == 'true' || false,
            privateKey: env.SSL_PRIVATE_KEY || '',
            certificate: env.SSL_CERTIFICATE || '',
        },
        api: {
            prefix: env.API_PREFIX || 'api',
            version: env.API_VERSION || 'v1',
            jsonLimit: env.API_JSON_LIMIT || '5mb',
            extUrlencoded: env.API_EXT_URLENCODED == 'false' || true,
        },
        cors: {
            allowOrigin: env.CORS_ALLOW_ORIGIN || '*',
        },
        jwt: {
            secretUser: env.JWT_SECRET_USER || '',
            secretAdmin: env.JWT_SECRET_ADMIN || '',
            secretApp: env.JWT_SECRET_APP || '',
            expiredIn: env.JWT_EXPIRED_IN || '24h',
        },
        bcrypt: {
            saltRounds: parseInt(env.BCRYPT_SALTROUNDS || '') || 10,
        },
        ratelimiter: {
            max: env.RATE_LIMIT_MAX || '100',
            window: env.RATE_LIMIT_WINDOW || '15',
        },
        debug: {
            http_request: env.DEBUG_HTTP_REQUEST == 'true' || false,
            http_connection: env.DEBUG_HTTP_CONNECTION == 'true' || false,
        },
    };
};

export default { testConfig, devConfig, stageConfig, prodConfig };
