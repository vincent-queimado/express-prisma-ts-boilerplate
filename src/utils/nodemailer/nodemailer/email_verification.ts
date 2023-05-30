import fs from 'fs';
import path from 'path';
import config from '@config/email';
import globalUrl from '@utils/global_http_url/global_http_url';
import sendMail from '@utils/nodemailer/nodemailer/core/nodemailer';

const registrationUrl = '/api/v1/auth/register/confirmation/';
const htmlTemplate = '../templates/email-verification.html';
const htmlFileEncoding = 'utf-8';

const emailSubject = 'Api - Confirmação de cadastro';
const emailText = 'E-mail de confirmação de cadastro.';

export default async (data: any) => {
    const url = generateRegistrationUrl(data);

    const htmlText = customMessage(data, url);

    const options = {
        from: config.smtp.user,
        to: data.email,
        text: emailText,
        subject: emailSubject,
        html: htmlText,
    };

    const sender = await sendMail(options);

    if (!sender) return false;

    return true;
};

const generateRegistrationUrl = (data: any) => {
    const url =
        `${globalUrl()}${registrationUrl}` +
        `?email=${data.email}&token=${data.tokenOfRegisterConfirmation}`;

    return url;
};

const customMessage = (data: any, url: string) => {
    const uname = data.name;
    const uppercaseWords = (str: string) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    let username = uname.split(' ')[0];
    username = uppercaseWords(data.name);

    let htmlText = fs
        .readFileSync(path.resolve(__dirname, htmlTemplate), {
            encoding: htmlFileEncoding,
        })
        .toString();

    htmlText = htmlText.replace('{{name}}', username);
    htmlText = htmlText.replace('{{url}}', url);

    return htmlText;
};
