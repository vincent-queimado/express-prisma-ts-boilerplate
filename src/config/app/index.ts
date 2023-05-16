import * as dotenv from 'dotenv';
dotenv.config();

import envConfigs from './config_app';
import { IBaseConfig, IConfig, IEnvConfig, IProcessEnv } from './types';

const processEnv: IProcessEnv = process.env;
const nodeEnv: string = processEnv.NODE_ENV || 'development';

const baseConfig: IBaseConfig = {
    nodeEnv,
    isTest: nodeEnv === 'test',
    isDev: nodeEnv === 'development',
    isStage: nodeEnv === 'staging',
    isProd: nodeEnv === 'production',
};

let envConfig: IEnvConfig;

switch (nodeEnv) {
    case 'test':
        envConfig = envConfigs.testConfig(processEnv);
        break;
    case 'development':
        envConfig = envConfigs.devConfig(processEnv);
        break;
    case 'staging':
        envConfig = envConfigs.stageConfig(processEnv);
        break;
    case 'production':
        envConfig = envConfigs.prodConfig(processEnv);
        break;
    default:
        envConfig = envConfigs.devConfig(processEnv);
}

const config: IConfig = { ...baseConfig, ...envConfig };

export = config;
