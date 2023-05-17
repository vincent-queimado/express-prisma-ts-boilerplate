import fs from 'fs';
import path from 'path';
import nodemailer from './nodemailer';
import config from '@config/email';
import globalUrl from '@utils/global_http_url/globalurl';

const htmlTemplate = '../templates/welcome.html';
const htmlFileEncoding = 'utf-8';

const emailSubject = 'Api - Seja bem-vindo(a)';
const emailText = 'Seja bem-vindo(a)';

export default async (data: any) => {
    const uname = data.name;
    const uppercaseWords = (str: string) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
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
        from: config.smtp.user,
        to: data.email,
        text: emailText,
        subject: emailSubject,
        html: htmlText,
    };

    const sender = await nodemailer(options);

    return sender;
};
