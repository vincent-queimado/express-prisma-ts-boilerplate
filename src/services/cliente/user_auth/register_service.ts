import randtoken from 'rand-token';

import config from '@config/app/index';
import httpMsg from '@utils/http_messages/http_msg';
import servCreateUser from '@dao/users/user_create_dao';
import servUpdateUser from '@dao/users/user_update_dao';
import servFindOneUser from '@dao/users/user_get_one_dao';
import servHashPassword from '@functions/generate_hash_password';
import sendEmail from '@utils/nodemailer/nodemailer/email_verification';

const errorCod = 'ERROR_USER_REGISTER';
const errorMsg = 'Failed to register user';
const errorMsgDeleted = 'Failed to register a deleted user';
const errorMsgDisabled = 'Failed to register a disabled user';
const errorMsgRegistered = 'Failed to register an already registered user';

const isEmailNotif = true;

export default async (data: any) => {
    let registeredUser;

    // Check required user datas
    if (!checkRequiredDatas(data)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser({ email: data.email });
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    // If user exist but is not registered: update user
    if (user.data && !user.data.isRegistered) {
        data.isDeleted = false;
        const updatedUser = await updateUser(user.data.id, data);
        if (!updatedUser.success) return httpMsg.http422(errorMsg, errorCod);
        registeredUser = updatedUser.data;
    }

    // If user not exist: create new user
    if (!user.data) {
        const createdUser = await createUser(data);
        if (!createdUser.success) return httpMsg.http422(errorMsg, errorCod);
        registeredUser = createdUser.data;
    }

    // Send Email
    if (!config.isTest && isEmailNotif) {
        const sended = await sendEmail(registeredUser);
        if (!sended) return httpMsg.http422(errorMsg, errorCod);
    }

    delete registeredUser.tokenOfRegisterConfirmation;

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

const getUser = async (where: object) => {
    const select = {
        id: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
    };

    // Get user by email
    const result = await servFindOneUser(where, select);

    // Check user status
    if (!result.success) return { success: false, data: null, error: errorMsg };
    if (result.data) {
        if (result.data.isDeleted) return { success: false, data: null, error: errorMsgDeleted }; // Need not to be excluded
        if (result.data.isDisabled) return { success: false, data: null, error: errorMsgDisabled }; // Need to be enabled
        if (result.data.isRegistered)
            return { success: false, data: null, error: errorMsgRegistered }; // Need not to be registered
    }

    return { success: true, data: result.data, error: null };
};

const createUser = async (datas: any) => {
    const select = {
        name: true,
        email: true,
        phone: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Hash user password
    const hashedPassword = await hashUserPassword(datas.password);
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    datas.password = hashedPassword.data;

    // Create user tokens
    datas.tokenOfRegisterConfirmation = randtoken.suid(16);
    datas.tokenOfResetPassword = randtoken.suid(16);

    // Create user
    const created = await servCreateUser(datas, select);

    /* istanbul ignore if */
    if (!created.success || !created.data) return { success: false, data: null };

    return { success: true, data: created.data };
};

const updateUser = async (id: string, datas: any) => {
    const select = {
        name: true,
        email: true,
        phone: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Hash user password
    const hashedPassword = await hashUserPassword(datas.password);
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    datas.password = hashedPassword.data;

    // Create user tokens
    datas.tokenOfRegisterConfirmation = randtoken.suid(16);
    datas.tokenOfResetPassword = randtoken.suid(16);

    // Update user
    const updated = await servUpdateUser(id, datas, select);

    /* istanbul ignore if */
    if (!updated.success || !updated.data) return { success: false, data: null };

    return { success: true, data: updated.data };
};

const hashUserPassword = async (plainPassword: string) => {
    const hashedPassword = await servHashPassword(plainPassword);

    /* istanbul ignore if  */
    if (!hashedPassword.success || !hashedPassword.data) return { success: false, data: null };

    return { success: true, data: hashedPassword.data };
};
