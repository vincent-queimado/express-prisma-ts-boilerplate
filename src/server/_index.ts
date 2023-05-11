import moment from 'moment';
import colorTxt from 'ansi-colors';

import pkg from '@packagejson';
import server from 'src/server/http_server';
import db from '@database/db/db_connection';
import logger from '@utils/winston_file_logger/winston/logger';

const startup = () => {
    /* eslint-disable no-console */
    console.clear();

    console.log(
        colorTxt.bgWhite.black(`\n Starting ${pkg.name.toUpperCase()} `) +
            colorTxt.bgMagenta.black(` v${pkg.version} `),
    );

    console.log(colorTxt.white(`-> Running in ${process.env.NODE_ENV} environment`));

    console.log(colorTxt.white(`-> Started at ${moment().format('YYYY-MM-DD HH:mm')}`));
    /* eslint-enable no-console */

    logger.info(`Api starting ${pkg.name.toUpperCase()} v${pkg.version}`);
    logger.info(`Api running in ${process.env.NODE_ENV} environment`);
    logger.info(`Api started at ${moment().format('YYYY-MM-DD HH:mm')}`);

    server();
    db.checkConnection();
};

export default {
    startup,
};
