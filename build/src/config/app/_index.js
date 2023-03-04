"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const config_app_1 = __importDefault(require("./config_app"));
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
        envConfig = config_app_1.default.devConfig(processEnv);
        break;
    case 'staging':
        envConfig = config_app_1.default.stageConfig(processEnv);
        break;
    case 'production':
        envConfig = config_app_1.default.prodConfig(processEnv);
        break;
    default:
        envConfig = config_app_1.default.devConfig(processEnv);
}
const config = Object.assign(Object.assign({}, baseConfig), envConfig);
module.exports = config;
