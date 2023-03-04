"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_js_1 = __importDefault(require("./nodemailer.js"));
const config_email_js_1 = __importDefault(require("../../../config/email/config_email.js"));
const globalurl_js_1 = __importDefault(require("../../url/globalurl.js"));
const htmlTemplate = '../templates/welcome.html';
const htmlFileEncoding = 'utf-8';
const emailSubject = 'Melibee - Seja bem-vindo(a)';
const emailText = 'Seja bem-vindo(a)';
const env = process.env.NODE_ENV || 'development';
const confEmail = config_email_js_1.default[env];
exports.default = async (data) => {
    const uname = data.name;
    const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
    let username = uname.split(' ')[0];
    username = uppercaseWords(data.name);
    const url = `${(0, globalurl_js_1.default)()}/welcome.html`;
    let htmlText = fs_1.default
        .readFileSync(path_1.default.resolve(__dirname, htmlTemplate), {
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
    const sender = await (0, nodemailer_js_1.default)(options);
    return sender;
};
