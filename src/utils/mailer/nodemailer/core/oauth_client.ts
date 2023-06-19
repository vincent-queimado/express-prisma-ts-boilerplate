import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import config from '@config/email';
import logger from '@utils/logger/winston/logger';

const OAuth2 = OAuth2Client;

const transporter = async () => {
    let transporter;

    try {
        const oauth2Client = new OAuth2(
            config.oauth.clientId,
            config.oauth.clientSecret,
            config.oauth.redirect,
        );

        oauth2Client.setCredentials({
            refresh_token: config.oauth.refreshToken,
        });

        let accessToken;

        oauth2Client
            .refreshAccessToken()
            .then((tokens) => (accessToken = tokens.credentials.access_token))
            .catch((err) => logger.error(`Nodemailer - OAuth2 Refresh token error. ${err}`));

        transporter = nodemailer.createTransport({
            service: String(config.smtp.service),
            // host: 'smtp.gmail.com',
            // port: 465,
            // secure: true,
            auth: {
                type: 'OAuth2',
                user: String(config.smtp.user),
                // pass: String(config.smtp.password),
                clientId: String(config.oauth.clientId),
                clientSecret: String(config.oauth.clientSecret),
                refreshToken: String(config.oauth.refreshToken),
                accessToken: String(accessToken),
                expires: 3600,
            },
            // tls: {
            //     rejectUnauthorized: false,
            // },
            // debug: config.debug.debug,
            // logger: config.debug.logger,
        });
    } catch (err) {
        logger.error(`Nodemailer - OAuth2 error. ${err}`);
    }

    return transporter;
};

export default transporter;
