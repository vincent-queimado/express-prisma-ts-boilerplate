import nodemailer from 'nodemailer';
import config from '../../../config/email/_index';
import logger from '../../winston_file_logger/winston/logger';

const errorSendEmail = 'Error to send e-mail.';

export default async (options: any) => {
    const transporter = nodemailer.createTransport({
        // service: config.smtp.service,
        auth: {
            // type: config.auth.type,
            user: config.smtp.user,
            pass: config.smtp.password,
            clientId: config.oauth.clientId,
            clientSecret: config.oauth.clientSecret,
            refreshToken: config.oauth.refreshToken,
        },
        debug: config.debug.debug,
        logger: config.debug.logger,
    });

    const sender = await transporter
        .sendMail(options)
        .then(() => ({ success: true, data: null }))
        .catch((err) => {
            logger.error(`${errorSendEmail} ${err}`);
            return { success: false, data: err };
        });

    return sender;
};
