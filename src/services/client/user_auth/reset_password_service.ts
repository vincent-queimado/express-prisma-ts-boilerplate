import path from 'path';

import config from '@config/app/index';
import constError from '@constants/error_constant';
import constEmail from '@constants/email_constant';
import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@dao/users/user_update_dao';
import servFindOneUser from '@dao/users/user_get_one_dao';
import servHashPassword from '@functions/generate_hash_password';
import uppercaseWords from '@functions/uppercase_words';
import sender from '@utils/mailer/nodemailer/sender';

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data))
        return httpMsg.http422(
            constError.RESET_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.resetPassword,
        );

    // Check existing user and get data
    const user = await getUser({ email: data.email, isDeleted: false, isRegistered: true });
    if (!user.success)
        return httpMsg.http422(user.error || '', constError.ERROR_CODE.resetPassword);

    // Check if user token is correct
    if (!checkUserToken(user.data.tokenOfResetPassword, data.token))
        return httpMsg.http422(
            constError.RESET_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.resetPassword,
        );

    // Update user with new password
    await updateUserPassword(user.data.id, data.password);

    // Send Email
    if (!config.isTest && constEmail.IS_NOTIFICATE.passwordReset) {
        const sended = await sendEmail(user.data);
        if (!sended)
            return httpMsg.http422(
                constError.RESET_PASSWORD_MSG.failToRequest,
                constError.ERROR_CODE.resetPassword,
            );
    }

    // Success HTTP return
    return httpMsg.http200({ email: data.email });
};

const checkRequiredDatas = (data: any) => /* istanbul ignore next */ {
    if (!data.email || !data.token || !data.password) false;
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
        return { success: false, data: null, error: constError.RESET_PASSWORD_MSG.failToRequest };
    if (!result.data.tokenOfResetPassword)
        return { success: false, data: null, error: constError.RESET_PASSWORD_MSG.failToRequest }; // Need to have a reset password token

    return { success: true, data: result.data, error: null };
};

const checkUserToken = (userToken: string, token: string) => {
    if (userToken !== token) return false;
    return true;
};

const updateUserPassword = async (id: string, plainPassword: string) => {
    const select = {
        id: true,
        name: true,
        email: true,
    };

    // Hash the plain password
    const hashed = await servHashPassword(plainPassword);
    if (!hashed.success || !hashed.data)
        return httpMsg.http422(
            constError.RESET_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.resetPassword,
        );

    // Update user password
    const updated = await servUpdateUser(id, { password: hashed.data }, select);
    if (!updated.success)
        return httpMsg.http422(
            constError.RESET_PASSWORD_MSG.failToRequest,
            constError.ERROR_CODE.resetPassword,
        );
};

const sendEmail = async (data: any) => {
    const template: any = {};

    data.name = await uppercaseWords(data.name.split(' ')[0]);
    data.url = constEmail.WELCOME_REDIRECT;
    template.subject = constEmail.TEMPLATE_SUBJECT.passwordReset;
    template.path = path.resolve(
        constEmail.TEMPLATE_PATH.client,
        constEmail.TEMPLATE_FILE.passwordReset,
    );

    const result = await sender(template, data);
    if (!result) return false;
    return true;
};
