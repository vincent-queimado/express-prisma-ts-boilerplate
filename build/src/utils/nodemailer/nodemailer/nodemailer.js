"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_email_js_1 = __importDefault(require("../../../config/email/config_email.js"));
const logger_js_1 = __importDefault(require("../../logging/winston/logger.js"));
const errorSendEmail = 'Error to send e-mail.';
const env = process.env.NODE_ENV || 'development';
const confEmail = config_email_js_1.default[env];
exports.default = async (options) => {
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
    const sender = await transporter
        .sendMail(options)
        .then(() => ({ success: true, data: null }))
        .catch((err) => {
        logger_js_1.default.error(`${errorSendEmail} ${err}`);
        return { success: false, data: err };
    });
    return sender;
};
