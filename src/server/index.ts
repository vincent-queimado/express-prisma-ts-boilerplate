import moment from 'moment';
import colorTxt from 'ansi-colors';

import pkg from '@packagejson';
import server from '@server/http_server';
import db from '@database/db_connection';
import logger from '@utils/logger/winston/logger';

const startup = async (silent: boolean) => {
    if (!silent) {
        /* eslint-disable no-console */
        // console.clear();
        console.log(
            colorTxt.bgWhite.black(`\n Starting ${pkg.name.toUpperCase()} `) +
                colorTxt.bgMagenta.black(` v${pkg.version} `),
        );
        console.log(colorTxt.white(`-> Running in ${process.env.NODE_ENV} environment`));
        console.log(colorTxt.white(`-> Started at ${moment().format('YYYY-MM-DD HH:mm')}`));
        /* eslint-enable no-console */
    }

    logger.info(`Api starting ${pkg.name.toUpperCase()} v${pkg.version}`);
    logger.info(`Api running in ${process.env.NODE_ENV} environment`);
    logger.info(`Api started at ${moment().format('YYYY-MM-DD HH:mm')}`);

    await runServer(silent);
    await checkDatabase(silent);
};

const runServer = async (silent: boolean) => {
    await server(silent);
};

const checkDatabase = async (silent: boolean) => {
    const res = await db.checkConnection();

    /* eslint-disable no-console */
    if (res.success) {
        if (!silent) console.log(colorTxt.white(`-> Connected on database`));
        logger.info(`Database connection has been established successfully.`);
    } else {
        if (!silent) console.log(colorTxt.red(`-> Unable to connect to the database`));
        logger.error(`Unable to connect to the database: ${res.error}`);
    }
    /* eslint-enable no-console */
};

export default startup;
