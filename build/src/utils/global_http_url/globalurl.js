"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_app_js_1 = __importDefault(require("../../config/app/config_app.js"));
const env = process.env.NODE_ENV || 'development';
const conf = config_app_js_1.default[env];
exports.default = () => {
    let url;
    // eslint-disable-next-line no-unused-expressions
    conf.server.ssl === 'true'
        ? (url = `https://${conf.server.host}:${conf.server.port}`)
        : (url = `http://${conf.server.host}:${conf.server.port}`);
    return url;
};
