"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../../utils/winston_file_logger/winston/logger"));
const http_msg_1 = __importDefault(require("../../../utils/http_messages/http_msg"));
const api_info_1 = __importDefault(require("../../services/commons/api_info"));
const lblErr = 'API Info error';
exports.default = async () => {
    try {
        const result = await (0, api_info_1.default)();
        if (!result.success || !result.data)
            return http_msg_1.default.http422('Erro ao carregar informações', lblErr);
        return http_msg_1.default.http200(result.data);
    }
    catch (err) {
        logger_1.default.error(`Erro ao carregar informações de API. ${err.message}`);
        return http_msg_1.default.http422('Erro ao carregar informações', lblErr);
    }
};
