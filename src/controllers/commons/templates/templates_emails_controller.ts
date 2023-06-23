import { Request, Response } from 'express';
import constEmail from '@constants/email_constant';
import logger from '@utils/logger/winston/logger';

const userWelcome = (req: Request, res: Response) => {
    try {
        res.render('templates/email/client/user_welcome', constEmail.WELCOME_TEMPLATE_DATA_SAMPLE);
    } catch (err: any) {
        logger.error(`Template view error. ${err.message}`);
    }
};

const userEmailVerify = (req: Request, res: Response) => {
    try {
        res.render(
            'templates/email/client/user_email_verify',
            constEmail.EMAIL_VERIFY_TEMPLATE_DATA_SAMPLE,
        );
    } catch (err: any) {
        logger.error(`Template view error. ${err.message}`);
    }
};

const userPasswordRequest = (req: Request, res: Response) => {
    try {
        res.render('templates/email/client/user_password_request', {});
    } catch (err: any) {
        logger.error(`Template view error. ${err.message}`);
    }
};

const userPasswordReseted = (req: Request, res: Response) => {
    try {
        res.render('templates/email/client/user_password_reseted', {});
    } catch (err: any) {
        logger.error(`Template view error. ${err.message}`);
    }
};

export default {
    userWelcome,
    userEmailVerify,
    userPasswordRequest,
    userPasswordReseted,
};
