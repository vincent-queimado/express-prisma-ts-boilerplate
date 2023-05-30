import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from '@config/email';
// import logger from '@utils/winston_file_logger/winston/logger';

const OAuth2 = google.auth.OAuth2;

const transporter = async () => {
    const oauth2Client = new OAuth2(
        config.oauth.clientId,
        config.oauth.clientSecret,
        'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
        refresh_token: config.oauth.refreshToken,
    });

    let accessToken;

    oauth2Client
        .refreshAccessToken()
        .then((tokens) => (accessToken = tokens.credentials.access_token));

    const transporter = nodemailer.createTransport({
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
        logger: config.debug.logger,
    });

    return transporter;
};

export default transporter;
