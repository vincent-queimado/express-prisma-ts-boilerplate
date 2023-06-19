import path from 'path';

import config from '@config/app/index';
import constError from '@constants/error_constant';
import constEmail from '@constants/email_constant';
import httpMsg from '@utils/http_messages/http_msg';
import sender from '@utils/mailer/nodemailer/sender';
import uppercaseWords from '@functions/uppercase_words';
import updateUser from '@dao/users/user_update_dao';
import findOneUser from '@dao/users/user_get_one_dao';

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data))
        return httpMsg.http422(
            constError.REGISTER_CONFIRM_MSG.failToConfirm,
            constError.ERROR_CODE.registerConfirm,
        );

    // Check existing user and get data
    const user = await getUsr({ email: data.email, isDeleted: false, isRegistered: false });
    if (!user.success)
        return httpMsg.http422(user.error || '', constError.ERROR_CODE.registerConfirm);

    // Check user token
    if (!checkToken(data.token, user.data.tokenOfRegisterConfirmation))
        return httpMsg.http422(
            constError.REGISTER_CONFIRM_MSG.failToConfirm,
            constError.ERROR_CODE.registerConfirm,
        );

    // Update the user registration status
    const updated = await updateUsr(user.data.id, { isRegistered: true });
    if (!updated.success)
        return httpMsg.http422(
            constError.REGISTER_CONFIRM_MSG.failToConfirm,
            constError.ERROR_CODE.registerConfirm,
        );

    // Send Email
    if (!config.isTest && constEmail.IS_NOTIFICATE.emailVerify) {
        const sended = await sendEmail(user.data);
        if (!sended)
            return httpMsg.http422(
                constError.REGISTER_CONFIRM_MSG.failToConfirm,
                constError.ERROR_CODE.registerConfirm,
            );
    }

    return httpMsg.http200({
        email: user.data.email,
        isRegistered: true,
        isEmailNotif: constEmail.IS_NOTIFICATE.emailVerify,
    });
};

const checkRequiredDatas = (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return false;
    if (!datas.token) return false;

    return true;
};

const getUsr = async (where: object) => {
    const select = {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        accountType: true,
        password: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Get user by email
    const result = await findOneUser(where, select);

    // Check user status
    if (!result.success || !result.data)
        return { success: false, data: null, error: constError.REGISTER_CONFIRM_MSG.failToConfirm };
    if (!result.data.tokenOfRegisterConfirmation)
        return { success: false, data: null, error: constError.REGISTER_CONFIRM_MSG.failToConfirm }; // Need to have a token

    return { success: true, data: result.data, error: null };
};

const updateUsr = async (id: string, datas: any) => {
    const select = {
        id: true,
        isRegistered: true,
    };

    const result = await updateUser(id, datas, select);

    /* istanbul ignore if */
    if (!result.success || !result.data) return { success: false, data: null };

    return { success: true, data: result.data };
};

const checkToken = (inputToken: string, token: string) => {
    if (inputToken !== token) return false;

    return true;
};

const sendEmail = async (data: any) => {
    const template: any = {};

    data.name = await uppercaseWords(data.name.split(' ')[0]);
    data.url = `${constEmail.REGISTRATION_REDIRECT}?email=${data.email}&token=${data.tokenOfRegisterConfirmation}`;

    template.subject = constEmail.TEMPLATE_SUBJECT.emailVerify;
    template.path = path.resolve(
        constEmail.TEMPLATE_PATH.client,
        constEmail.TEMPLATE_FILE.emailVerify,
    );

    const result = await sender(template, data);
    if (!result) return false;
    return true;
};
