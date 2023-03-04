"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_email_js_1 = __importDefault(require("../../../config/email/config_email.js"));
const logger_js_1 = __importDefault(require("../../logging/winston/logger.js"));
const globalurl_js_1 = __importDefault(require("../../url/globalurl.js"));
const htmlTemplate = '../templates/email-verification.html';
const htmlFileEncoding = 'utf-8';
const errorSendEmail = 'Error to send e-mail.';
const emailSubject = 'Melibee - Confirmação de cadastro';
const emailText = 'E-mail de confirmação de cadastro.';
const env = process.env.NODE_ENV || 'development';
const confEmail = config_email_js_1.default[env];
exports.default = async (data) => {
    const transporter = nodemailer_1.default.createTransport({
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
    const url = `${(0, globalurl_js_1.default)()}/api/v1/auth/signup/confirmation/` +
        `?email=${data.email}&token=${data.signupConfirmationToken}`;
    let htmlText = fs_1.default
        .readFileSync(path_1.default.resolve(__dirname, htmlTemplate), {
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
        logger_js_1.default.error(`${errorSendEmail} ${err}`);
        return { success: false };
    });
    return sender;
};
