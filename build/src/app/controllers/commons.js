"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = __importDefault(require("../presenters/commons/_index"));
const logger_1 = __importDefault(require("../../utils/winston_file_logger/winston/logger"));
const root = (req, res, next) => {
    _index_1.default
        .apiRoot()
        .then((result) => {
        try {
            res.redirect(result.data.content);
        }
        catch (err) {
            logger_1.default.error(`Erro ao redirecionar rota para raiz de url. ${err.message}`);
        }
    })
        .catch((err) => next(err));
};
const info = (req, res, next) => {
    _index_1.default
        .apiInfo()
        .then((result) => {
        try {
            res.status(result.httpStatusCode).json(result.data);
        }
        catch (err) {
            logger_1.default.error(`Erro ao apresentar informações de API. ${err.message}`);
        }
    })
        .catch((err) => next(err));
};
exports.default = {
    root,
    info,
};
