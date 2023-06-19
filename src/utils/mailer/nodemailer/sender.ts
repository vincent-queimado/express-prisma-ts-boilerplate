import ejs from 'ejs';
import nodemailer from './core/transporter';
import config from '@config/email';

export default async (template: any, data: any) => {
    const htmlText = await ejs.renderFile(template.path, data || null);

    const options = {
        from: config.smtp.user,
        to: data.email,
        text: template.subject,
        subject: template.subject,
        html: htmlText,
    };

    const sender = await nodemailer(options);

    return sender;
};
