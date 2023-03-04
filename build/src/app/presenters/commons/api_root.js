"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../utils/winston_file_logger/winston/logger"));
const http_msg_1 = __importDefault(require("../../../utils/http_messages/http_msg"));
const api_root_1 = __importDefault(require("../../services/commons/api_root"));
const lblErr = 'Root error';
exports.default = async () => {
    try {
        const result = await (0, api_root_1.default)();
        if (!result.success || !result.data)
            return http_msg_1.default.http422('Erro ao redirecionar', lblErr);
        return http_msg_1.default.http200(result.data);
    }
    catch (err) {
        logger_1.default.error(`Erro ao redicionar a url. ${err.message}`);
        return http_msg_1.default.http422('Erro ao tentar redirecionar.', lblErr);
    }
};
