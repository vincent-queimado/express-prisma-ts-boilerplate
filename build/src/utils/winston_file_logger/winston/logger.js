"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("winston-daily-rotate-file");
const winston_1 = __importDefault(require("winston"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const path = app_root_path_1.default.resolve('/logs/');
const custom = winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf((info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`));
const customInfo = winston_1.default.format.combine(winston_1.default.format.json(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf((info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`));
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.DailyRotateFile({
            frequency: '24h',
            name: 'error',
            level: 'error',
            dirname: `${path}/`,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            handleExceptions: true,
            prepend: true,
            zippedArchive: false,
            maxSize: '5m',
            maxFiles: '7d',
            format: custom,
        }),
        new winston_1.default.transports.DailyRotateFile({
            frequency: '24h',
            name: 'info',
            level: 'info',
            dirname: `${path}/`,
            filename: 'info-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            prepend: true,
            zippedArchive: false,
            maxSize: '5m',
            maxFiles: '7d',
            format: customInfo,
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), custom),
            level: 'error',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});
logger.stream = {
    write(message) {
        logger.info(message);
    },
};
exports.default = logger;
