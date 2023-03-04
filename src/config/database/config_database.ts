import { IEnvConfig, IProcessEnv } from './types';

const devConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            host: env.DATABASE_HOST || 'localhost',
            port: (env.DATABASE_PORT && parseInt(env.DATABASE_PORT, 10)) || 5432,
            schema: env.DATABASE_SCHEMA || 'public',
            database: env.DATABASE_DATABASE || 'database',
            username: env.DATABASE_USERNAME || 'admin',
            password: env.DATABASE_PASSWORD || 'admin',
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {},
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: false,
            force: true,
            timezone: '+00:00',
        },
    };
};

const stageConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            host: env.DATABASE_HOST || 'localhost',
            port: (env.DATABASE_PORT && parseInt(env.DATABASE_PORT, 10)) || 5432,
            schema: env.DATABASE_SCHEMA || 'public',
            database: env.DATABASE_DATABASE || 'database',
            username: env.DATABASE_USERNAME || 'admin',
            password: env.DATABASE_PASSWORD || 'admin',
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: false,
                    rejectUnauthorized: false,
                },
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: false,
            force: true,
            timezone: '+00:00',
        },
    };
};

const prodConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            host: env.DATABASE_HOST || 'localhost',
            port: (env.DATABASE_PORT && parseInt(env.DATABASE_PORT, 10)) || 5432,
            schema: env.DATABASE_SCHEMA || 'public',
            database: env.DATABASE_DATABASE || 'database',
            username: env.DATABASE_USERNAME || 'admin',
            password: env.DATABASE_PASSWORD || 'admin',
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: false,
                    rejectUnauthorized: false,
                },
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: false,
            force: true,
            timezone: '+00:00',
        },
    };
};

export default { devConfig, stageConfig, prodConfig };
