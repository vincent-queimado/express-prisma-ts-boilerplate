"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_glob_1 = __importDefault(require("fast-glob"));
const logger_1 = __importDefault(require("../../../utils/winston_file_logger/winston/logger"));
const logsFolder = 'logs/';
const logsExt = '.log';
exports.default = async () => {
    try {
        const filesInfo = await (0, fast_glob_1.default)([`${logsFolder}info-*${logsExt}`], {
            stats: true,
        });
        const filesError = await (0, fast_glob_1.default)([`${logsFolder}error-*${logsExt}`], {
            stats: true,
        });
        const logsInfo = filesInfo.map((el) => {
            const item = {};
            item.name = el.name;
            item.path = el.path;
            item.size = `${(el.stats.size / 1024).toFixed(2).toString()}kb`;
            item.modified = el.stats.mtime.toLocaleString();
            return item;
        });
        const logsError = filesError.map((el) => {
            const item = {};
            item.name = el.name;
            item.path = el.path;
            item.size = `${(el.stats.size / 1024).toFixed(2).toString()}kb`;
            item.modified = el.stats.mtime.toLocaleString();
            return item;
        });
        return { success: true, logsInfo, logsError };
    }
    catch (err) {
        logger_1.default.error(`Erro ao listar os arquivos de logs de API. ${err.message}`);
        return { success: false, filesInfo: [], filesError: [] };
    }
};
