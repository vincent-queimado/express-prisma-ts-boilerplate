export interface IProcessEnv {
    [key: string]: string | undefined;
}

interface IAuth {
    type: string;
}

interface ISmtp {
    service: string;
    user: string;
    password: string;
}

interface IOauth {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    redirect: string;
}

interface IDebug {
    debug: boolean;
    logger: boolean;
}

export interface IBaseConfig {
    nodeEnv: string;
    isTest: boolean;
    isDev: boolean;
    isStage: boolean;
    isProd: boolean;
}

export interface IEnvConfig {
    auth: IAuth;
    smtp: ISmtp;
    oauth: IOauth;
    debug: IDebug;
}

export interface IConfig extends IBaseConfig, IEnvConfig {}
