import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import config from '@config/email';
import logger from '@utils/winston_file_logger/winston/logger';
import globalUrl from '@utils/global_http_url/global_http_url';

const htmlTemplate = '../templates/email-verification.html';
const htmlFileEncoding = 'utf-8';

const errorSendEmail = 'Error to send e-mail.';
const emailSubject = 'Api - Confirmação de cadastro';
const emailText = 'E-mail de confirmação de cadastro.';

export default async (data: any) => {
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

    const uname = data.name;
    const uppercaseWords = (str: string) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    let username = uname.split(' ')[0];
    username = uppercaseWords(data.name);

    const url =
        `${globalUrl()}/api/v1/auth/signup/confirmation/` +
        `?email=${data.email}&token=${data.tokenOfRegisterConfirmation}`;

    let htmlText = fs
        .readFileSync(path.resolve(__dirname, htmlTemplate), {
            encoding: htmlFileEncoding,
        })
        .toString();
    htmlText = htmlText.replace('{{name}}', username);
    htmlText = htmlText.replace('{{url}}', url);

    const mailOptions = {
        from: config.smtp.user,
        to: data.email,
        text: emailText,
        subject: emailSubject,
        html: htmlText,
    };

    const sender = await transporter
        .sendMail(mailOptions)
        .then(() => ({ success: true }))
        .catch((err: any) => {
            logger.error(`${errorSendEmail} ${err}`);
            return { success: false };
        });

    return sender;
};
