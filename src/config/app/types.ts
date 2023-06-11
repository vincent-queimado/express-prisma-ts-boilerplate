export interface IProcessEnv {
    [key: string]: string | undefined;
}

interface IApp {
    host: string;
    port: number;
}

interface ISsl {
    isHttps: boolean;
    privateKey: string;
    certificate: string;
}

interface IApi {
    prefix: string;
    version: string;
    jsonLimit: string;
    extUrlencoded: boolean;
}

interface IRatelimiter {
    max: string;
    window: string;
}

interface IJwt {
    secretUser: string;
    secretAdmin: string;
    secretApp: string;
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
    ssl: ISsl;
    api: IApi;
    ratelimiter: IRatelimiter;
    jwt: IJwt;
    cors: ICors;
    bcrypt: IBcrypt;
    debug: IDebug;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
