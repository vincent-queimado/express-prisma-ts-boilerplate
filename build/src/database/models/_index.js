"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const _index_1 = __importDefault(require("../../config/database/_index"));
const logger_1 = __importDefault(require("../../utils/winston_file_logger/winston/logger"));
const database = _index_1.default.database;
const username = _index_1.default.username;
const password = _index_1.default.password;
const host = _index_1.default.host;
const port = _index_1.default.port;
const dialect = _index_1.default.dialect;
const dialectOptions = _index_1.default.dialectOptions;
const pool = _index_1.default.pool;
const logging = _index_1.default.logging;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    port,
    dialect,
    dialectOptions,
    pool,
    logging,
});
exports.sequelize = sequelize;
sequelize
    .authenticate()
    .then(() => {
    /* eslint-disable no-console */
    console.log(ansi_colors_1.default.white(`-> Database connected on ${host}:${port}`));
    logger_1.default.info(`Database connection has been established successfully.`);
})
    .catch((err) => {
    /* eslint-disable no-console */
    console.log(ansi_colors_1.default.red('-> Unable to connect to the database'));
    /* eslint-enable no-console */
    logger_1.default.info(`Unable to connect to the database: ${err})`);
});
