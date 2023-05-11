/* PROCESS */

export interface IProcessEnv {
    [key: string]: string | undefined;
}

/* CONFIG */

interface IDatabase {
    provider: string;
    url: string;
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
