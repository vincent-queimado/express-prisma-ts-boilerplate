"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_database_1 = __importDefault(require("./config_database"));
const processEnv = process.env;
const nodeEnv = processEnv.NODE_ENV || 'development';
const baseConfig = {
    nodeEnv,
    isDev: nodeEnv === 'development',
    isStage: nodeEnv === 'staging',
    isProd: nodeEnv === 'production',
};
let envConfig;
switch (nodeEnv) {
    case 'development':
        envConfig = config_database_1.default.devConfig(processEnv);
        break;
    case 'staging':
        envConfig = config_database_1.default.stageConfig(processEnv);
        break;
    case 'production':
        envConfig = config_database_1.default.prodConfig(processEnv);
        break;
    default:
        envConfig = config_database_1.default.devConfig(processEnv);
}
const config = Object.assign(Object.assign({}, baseConfig), envConfig);
module.exports = config.database;
