import path from 'path';
import randtoken from 'rand-token';

import config from '@config/app/index';
import constError from '@constants/error_constant';
import constEmail from '@constants/email_constant';
import httpMsg from '@utils/http_messages/http_msg';
import createUser from '@dao/users/user_create_dao';
import updateUser from '@dao/users/user_update_dao';
import sender from '@utils/mailer/nodemailer/sender';
import findOneUser from '@dao/users/user_get_one_dao';
import uppercaseWords from '@functions/uppercase_words';
import hashPassword from '@functions/generate_hash_password';

export default async (data: any) => {
    let registeredUser;

    // Check required user datas
    if (!checkRequiredDatas(data))
        return httpMsg.http422(
            constError.REGISTER_ERROR_MSG.failToRegister,
            constError.ERROR_CODE.register,
        );

    // Check existing user and get data
    const user = await getUsr({ email: data.email });
    if (!user.success) return httpMsg.http422(user.error || '', constError.ERROR_CODE.register);

    // If user exist but is not registered: update user
    if (user.data && !user.data.isRegistered) {
        data.isDeleted = false;
        const updatedUser = await updateUsr(user.data.id, data);
        if (!updatedUser.success)
            return httpMsg.http422(
                constError.REGISTER_ERROR_MSG.failToRegister,
                constError.ERROR_CODE.register,
            );
        registeredUser = updatedUser.data;
    }

    // If user not exist: create new user
    if (!user.data) {
        const createdUser = await createUsr(data);
        if (!createdUser.success)
            return httpMsg.http422(
                constError.REGISTER_ERROR_MSG.failToRegister,
                constError.ERROR_CODE.register,
            );
        registeredUser = createdUser.data;
    }
    // Delete some user datas
    delete registeredUser.tokenOfRegisterConfirmation;

    // Send Email
    if (!config.isTest && constEmail.IS_NOTIFICATE.welcome) {
        const sended = await sendEmail(registeredUser);
        if (!sended)
            return httpMsg.http422(
                constError.REGISTER_ERROR_MSG.failToRegister,
                constError.ERROR_CODE.register,
            );
        registeredUser.isEmailNotif = constEmail.IS_NOTIFICATE.welcome;
    }

    // Success HTTP return
    return httpMsg.http201(registeredUser);
};

const checkRequiredDatas = (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return false;
    if (!datas.name) return false;
    if (!datas.phone) return false;
    if (!datas.password) return false;

    return true;
};

const getUsr = async (where: object) => {
    const select = {
        id: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
    };

    // Get user by email
    const result = await findOneUser(where, select);

    // Check user status
    if (!result.success)
        return { success: false, data: null, error: constError.REGISTER_ERROR_MSG.failToRegister };
    if (result.data) {
        if (result.data.isDeleted)
            return {
                success: false,
                data: null,
                error: constError.REGISTER_ERROR_MSG.failToDeleted,
            }; // Need not to be excluded
        if (result.data.isDisabled)
            return {
                success: false,
                data: null,
                error: constError.REGISTER_ERROR_MSG.failToDisabled,
            }; // Need to be enabled
        if (result.data.isRegistered)
            return {
                success: false,
                data: null,
                error: constError.REGISTER_ERROR_MSG.AlreadyRegistered,
            }; // Need not to be registered
    }

    return { success: true, data: result.data, error: null };
};

const createUsr = async (datas: any) => {
    const select = {
        name: true,
        email: true,
        phone: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Hash user password
    const hashedPassword = await hashPasswordUsr(datas.password);
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    datas.password = hashedPassword.data;

    // Create user tokens
    datas.tokenOfRegisterConfirmation = randtoken.suid(16);
    datas.tokenOfResetPassword = randtoken.suid(16);

    // Create user
    const created = await createUser(datas, select);

    /* istanbul ignore if */
    if (!created.success || !created.data) return { success: false, data: null };

    return { success: true, data: created.data };
};

const updateUsr = async (id: string, datas: any) => {
    const select = {
        name: true,
        email: true,
        phone: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Hash user password
    const hashedPassword = await hashPasswordUsr(datas.password);
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    datas.password = hashedPassword.data;

    // Create user tokens
    datas.tokenOfRegisterConfirmation = randtoken.suid(16);
    datas.tokenOfResetPassword = randtoken.suid(16);

    // Update user
    const updated = await updateUser(id, datas, select);

    /* istanbul ignore if */
    if (!updated.success || !updated.data) return { success: false, data: null };

    return { success: true, data: updated.data };
};

const hashPasswordUsr = async (plainPassword: string) => {
    const hashedPassword = await hashPassword(plainPassword);

    /* istanbul ignore if  */
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    return { success: true, data: hashedPassword.data };
};

const sendEmail = async (data: any) => {
    const template: any = {};

    data.name = await uppercaseWords(data.name.split(' ')[0]);
    data.url = constEmail.WELCOME_REDIRECT;
    template.subject = constEmail.TEMPLATE_SUBJECT.welcome;
    template.path = path.resolve(constEmail.TEMPLATE_PATH.client, constEmail.TEMPLATE_FILE.welcome);

    const result = await sender(template, data);
    if (!result) return false;
    return true;
};
