export interface IProcessEnv {
    [key: string]: string | undefined;
}

interface IApp {
    host: string;
    port: number;
    ssl: boolean;
}

interface IApi {
    prefix: string;
    version: string;
    jsonLimit: string;
    extUrlencoded: boolean;
}

interface IJwt {
    secret: string;
    expiredIn: string;
}

interface ICors {
    allowOrigin: string;
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
    cors: ICors;
    bcrypt: IBcrypt;
    debug: IDebug;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
