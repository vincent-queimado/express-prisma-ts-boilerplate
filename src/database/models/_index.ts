import colorTxt from 'ansi-colors';
import { Sequelize } from 'sequelize';

import config from '../../config/database/_index';
import logger from '../../utils/winston_file_logger/winston/logger';

const database = config.database;
const username = config.username;
const password = config.password;
const host = config.host;
const port = config.port;
const dialect = config.dialect;
const dialectOptions = config.dialectOptions;
const pool = config.pool;
const logging = config.logging;

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    dialectOptions,
    pool,
    logging,
});

sequelize
    .authenticate()
    .then(() => {
        /* eslint-disable no-console */
        console.log(
            colorTxt.white(`-> Database connected on ${host}:${port}`),
            /* eslint-enable no-console */
        );
        logger.info(`Database connection has been established successfully.`);
    })
    .catch((err) => {
        /* eslint-disable no-console */
        console.log(colorTxt.red('-> Unable to connect to the database'));
        /* eslint-enable no-console */
        logger.info(`Unable to connect to the database: ${err})`);
    });

export { Sequelize, sequelize };
