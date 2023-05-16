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

interface IApi {
    version: string;
}

interface IJwt {
    secret: string;
    expiredIn: string;
}

interface IBcrypt {
    saltRounds: number;
}

interface IDebug {
    http_request: boolean;
    http_connection: boolean;
}

export interface IBaseConfig {
    nodeEnv: string;
    isTest: boolean;
    isDev: boolean;
    isStage: boolean;
    isProd: boolean;
}

export interface IEnvConfig {
    app: IApp;
    api: IApi;
    jwt: IJwt;
    bcrypt: IBcrypt;
    debug: IDebug;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
