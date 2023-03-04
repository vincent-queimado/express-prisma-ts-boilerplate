/* PROCESS */

export interface IProcessEnv {
    [key: string]: string | undefined;
}

/* CONFIG */

interface IDatabase {
    host: string;
    port: number;
    schema: string;
    database: string;
    username: string;
    password: string;
    dialect: any;
    protocol: string;
    dialectOptions: {
        ssl?: {
            require: boolean;
            rejectUnauthorized: boolean;
        };
    };
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
    logging: boolean;
    force: boolean;
    timezone: string;
}

export interface IBaseConfig {
    nodeEnv: string;
    isDev: boolean;
    isStage: boolean;
    isProd: boolean;
}

export interface IEnvConfig {
    database: IDatabase;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
