"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../../../package.json"));
const _index_1 = __importDefault(require("../presenters/logs/_index"));
const logger_1 = __importDefault(require("../../utils/winston_file_logger/winston/logger"));
const listar = (req, res, next) => {
    _index_1.default
        .listar()
        .then((result) => {
        try {
            res.render('logs', {
                title: `Logs de Api ${package_json_1.default.name.toUpperCase()}`,
                logsInfo: result.logsInfo,
                logsError: result.logsError,
            });
        }
        catch (err) {
            logger_1.default.error(`Erro ao listar os arquivos de logs de API. ${err.message}`);
        }
    })
        .catch((err) => next(err));
};
exports.default = {
    listar,
};
