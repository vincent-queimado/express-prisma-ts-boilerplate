import logger from '@utils/winston_file_logger/winston/logger';
import transporter from '@utils/nodemailer/nodemailer/core/oauth_client';

const errorSendEmail = 'Error to send e-mail.';

export default async (options: any) => {
    const emailTransporter = await transporter();

    const sendEmail = await emailTransporter
        .sendMail(options)
        .then(() => ({ success: true, data: null }))
        .catch((err) => {
            logger.error(`${errorSendEmail} ${err}`);
            return { success: false, data: err };
        });

    if (!sendEmail.success) false;

    return true;
};
