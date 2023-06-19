import path from 'path';
import randtoken from 'rand-token';

import config from '@config/app/index';
import constError from '@constants/error_constant';
import constEmail from '@constants/email_constant';
import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@dao/users/user_update_dao';
import servFindOneUser from '@dao/users/user_get_one_dao';
import uppercaseWords from '@functions/uppercase_words';
import sender from '@utils/mailer/nodemailer/sender';

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data))
        return httpMsg.http422(
            constError.REQUEST_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.requestPassword,
        );

    // Check existing user and get data
    const user = await getUser({ email: data.email, isDeleted: false, isRegistered: true });
    if (!user.success)
        return httpMsg.http422(user.error || '', constError.ERROR_CODE.requestPassword);

    // Update user reset password token
    if (!updateUserToken(user.data.id))
        return httpMsg.http422(
            constError.REQUEST_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.requestPassword,
        );

    // Send Email
    if (!config.isTest && constEmail.IS_NOTIFICATE.passwordRequest) {
        const sended = await sendEmail(user.data);
        if (!sended)
            return httpMsg.http422(
                constError.REQUEST_PASSWORD_MSG.failToRequest,
                constError.ERROR_CODE.requestPassword,
            );
    }

    // Success HTTP return
    return httpMsg.http200({
        email: user.data.email,
        isEmailNotif: constEmail.IS_NOTIFICATE.passwordRequest,
    });
};

const checkRequiredDatas = (data: any) => /* istanbul ignore next */ {
    if (!data.email) return false;

    return true;
};

const getUser = async (where: object) => {
    const select = {
        id: true,
        name: true,
        email: true,
        tokenOfResetPassword: true,
    };

    // Get user by email
    const result = await servFindOneUser(where, select);

    // Check user status
    if (!result.success || !result.data)
        return { success: false, data: null, error: constError.REQUEST_PASSWORD_MSG.failToRequest };
    if (!result.data.tokenOfResetPassword)
        return { success: false, data: null, error: constError.REQUEST_PASSWORD_MSG.failToRequest }; // Need to have a reset password token

    return { success: true, data: result.data, error: null };
};

const updateUserToken = async (id: string) => {
    const select = {
        id: true,
        name: true,
        email: true,
    };

    const tokenOfResetPassword = randtoken.suid(16);

    const result = await servUpdateUser(id, { tokenOfResetPassword }, select);

    if (!result.success) return false;

    return true;
};

const sendEmail = async (data: any) => {
    const template: any = {};

    data.name = await uppercaseWords(data.name.split(' ')[0]);
    data.url = `${constEmail.REGISTRATION_REDIRECT}?email=${data.email}&token=${data.tokenOfRegisterConfirmation}`;
    template.subject = constEmail.TEMPLATE_SUBJECT.passwordRequest;
    template.path = path.resolve(
        constEmail.TEMPLATE_PATH.client,
        constEmail.TEMPLATE_FILE.passwordRequest,
    );

    const result = await sender(template, data);
    if (!result) return false;
    return true;
};
