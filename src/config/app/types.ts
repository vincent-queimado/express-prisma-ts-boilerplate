/* PROCESS */

export interface IProcessEnv {
    [key: string]: string | undefined;
}

/* CONFIG */

interface IApp {
    host: string;
    port: number;
    ssl: boolean;
}

interface IJwt {
    secret: string;
    expiredIn: string;
}

interface IDebug {
    http_request: boolean;
    http_connection: boolean;
}

export interface IBaseConfig {
    nodeEnv: string;
    isDev: boolean;
    isStage: boolean;
    isProd: boolean;
}

export interface IEnvConfig {
    app: IApp;
    jwt: IJwt;
    debug: IDebug;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
