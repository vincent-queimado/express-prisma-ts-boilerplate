import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import configEmail from '../../../config/email/config_email.js';
import logger from '../../logging/winston/logger.js';
import globalUrl from '../../url/globalurl.js';

const htmlTemplate = '../templates/email-verification.html';
const htmlFileEncoding = 'utf-8';

const errorSendEmail = 'Error to send e-mail.';
const emailSubject = 'Melibee - Confirmação de cadastro';
const emailText = 'E-mail de confirmação de cadastro.';

const env = process.env.NODE_ENV || 'development';
const confEmail = configEmail[env];

export default async (data) => {
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

    const uname = data.name;
    const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    let username = uname.split(' ')[0];
    username = uppercaseWords(data.name);

    const url =
        `${globalUrl()}/api/v1/auth/signup/confirmation/` +
        `?email=${data.email}&token=${data.signupConfirmationToken}`;

    let htmlText = fs
        .readFileSync(path.resolve(__dirname, htmlTemplate), {
            encoding: htmlFileEncoding,
        })
        .toString();
    htmlText = htmlText.replace('{{name}}', username);
    htmlText = htmlText.replace('{{url}}', url);

    const mailOptions = {
        from: confEmail.smtp_user,
        to: data.email,
        text: emailText,
        subject: emailSubject,
        html: htmlText,
    };

    const sender = await transporter
        .sendMail(mailOptions)
        .then(() => ({ success: true }))
        .catch((err) => {
            logger.error(`${errorSendEmail} ${err}`);
            return { success: false };
        });

    return sender;
};
