import fs from 'fs';
import path from 'path';
import nodemailer from './nodemailer.js';
import configEmail from '../../../config/email/config_email.js';
import globalUrl from '../../url/globalurl.js';

const htmlTemplate = '../templates/welcome.html';
const htmlFileEncoding = 'utf-8';

const emailSubject = 'Melibee - Seja bem-vindo(a)';
const emailText = 'Seja bem-vindo(a)';

const env = process.env.NODE_ENV || 'development';
const confEmail = configEmail[env];

export default async (data) => {
    const uname = data.name;
    const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    let username = uname.split(' ')[0];
    username = uppercaseWords(data.name);

    const url = `${globalUrl()}/welcome.html`;

    let htmlText = fs
        .readFileSync(path.resolve(__dirname, htmlTemplate), {
            encoding: htmlFileEncoding,
        })
        .toString();
    htmlText = htmlText.replace('{{name}}', username);
    htmlText = htmlText.replace('{{url}}', url);

    const options = {
        from: confEmail.smtp_user,
        to: data.email,
        text: emailText,
        subject: emailSubject,
        html: htmlText,
    };

    const sender = await nodemailer(options);

    return sender;
};
