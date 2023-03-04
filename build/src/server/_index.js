"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const package_json_1 = __importDefault(require("../../package.json"));
const http_server_1 = __importDefault(require("./http_server"));
const logger_1 = __importDefault(require("./../utils/winston_file_logger/winston/logger"));
const startup = () => {
    /* eslint-disable no-console */
    console.clear();
    console.log(ansi_colors_1.default.bgWhite.black(`\n Starting ${package_json_1.default.name.toUpperCase()} `) +
        ansi_colors_1.default.bgMagenta.black(` v${package_json_1.default.version} `));
    console.log(ansi_colors_1.default.white(`-> Running in ${process.env.NODE_ENV} environment`));
    console.log(ansi_colors_1.default.white(`-> Started at ${(0, moment_1.default)().format('YYYY-MM-DD HH:mm')}`));
    /* eslint-enable no-console */
    logger_1.default.info(`Api starting ${package_json_1.default.name.toUpperCase()} v${package_json_1.default.version}`);
    logger_1.default.info(`Api running in ${process.env.NODE_ENV} environment`);
    logger_1.default.info(`Api started at ${(0, moment_1.default)().format('YYYY-MM-DD HH:mm')}`);
    (0, http_server_1.default)();
};
exports.default = {
    startup,
};
