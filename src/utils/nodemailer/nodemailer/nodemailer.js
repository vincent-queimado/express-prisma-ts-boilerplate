import nodemailer from 'nodemailer';
import configEmail from '../../../config/email/config_email.js';
import logger from '../../logging/winston/logger.js';

const errorSendEmail = 'Error to send e-mail.';

const env = process.env.NODE_ENV || 'development';
const confEmail = configEmail[env];

export default async (options) => {
    const transporter = nodemailer.createTransport({
        service: confEmail.smtp.service,
        auth: {
            type: confEmail.auth.type,
            user: confEmail.smtp.user,
            pass: confEmail.smtp.password,
            clientId: confEmail.oauth.clientId,
            clientSecret: confEmail.oauth.clientSecret,
            refreshToken: confEmail.oauth.refreshToken,
        },
        debug: confEmail.debug.debug,
        logger: confEmail.debug.logger,
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
