"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const _index_1 = __importDefault(require("../../config/app/_index"));
const logger_1 = __importDefault(require("../../utils/winston_file_logger/winston/logger"));
const stream = {
    write: (message) => logger_1.default.info(message.trim()),
};
const skip = () => {
    return !_index_1.default.debug.http_request;
};
const morganConsoleLogger = (0, morgan_1.default)('dev');
const morganFileLogger = (0, morgan_1.default)('HTTP request from :remote-addr :method :url :status :res[content-length] - :response-time ms', { stream, skip });
exports.default = {
    morganConsoleLogger,
    morganFileLogger,
};
