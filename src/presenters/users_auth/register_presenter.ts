import randtoken from 'rand-token';

import httpMsg from '@utils/http_messages/http_msg';
import servCreateUser from '@services/users/create_user_service';
import servUpdateUser from '@services/users/update_user_service';
import servFindOneUser from '@services/users/get_user_service';
import servHashPassword from '@functions/generate_hash_password';
import sendEmail from '@utils/nodemailer/nodemailer/email_verification';

const errCode = 'ERROR_USER_SIGNUP';

const msgErrorDataMissing = 'User data missing.';
const msgErrorCheckUser = 'Error to check user.';
const msgErrorUserAlreadyExist = 'User already exist.';
const msgErrorSaveUser = 'Error to save user data.';
const msgErrorUpdateUser = 'Error to update user.';
const msgErrorUserNotFound = 'User not found.';
const msgErrorSendingEmail = 'Error to sending confirmation email.';
const msgErrorHashPassword = 'Error to hash the User password.';

export default async (userDatas: any) => {
    const datas = userDatas;
    let user = {};

    // Check required datas
    const required = await requiredDatas(datas);
    /* istanbul ignore if  */
    if (!required.success) return httpMsg.http422(required.msgError, errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    if (!existUser.success) return httpMsg.http422(existUser.msgError, errCode);

    // Create User if not exist
    if (!existUser.data) {
        // Hash password
        const hashedPassword = await hashUserPassword(datas.password);
        /* istanbul ignore if  */
        if (!hashedPassword.success || !hashedPassword.data) {
            return httpMsg.http422(hashedPassword.msgError, errCode);
        }
        datas.password = hashedPassword.data;

        // Generate signup token
        datas.tokenOfRegisterConfirmation = await randtoken.suid(16);
        datas.tokenOfResetPassword = await randtoken.suid(16);

        // Create new User
        const createdUser = await createUser(datas);
        /* istanbul ignore if  */
        if (!createdUser.success) return httpMsg.http422(createdUser.msgError, errCode);
        user = { id: createdUser.data.id };
    }

    // Update User if exist with your signup is not complete
    if (existUser.data && !existUser.data.isRegistered) {
        // Hash password
        const hashedPassword = await hashUserPassword(datas.password);
        /* istanbul ignore if  */
        if (!hashedPassword.success || !hashedPassword.data) {
            return httpMsg.http422(hashedPassword.msgError, errCode);
        }
        datas.password = hashedPassword.data;

        // Generate signup token
        datas.tokenOfRegisterConfirmation = await randtoken.suid(16);
        datas.tokenOfResetPassword = await randtoken.suid(16);

        // Update User
        const updatedUser = await updateUser(existUser.data.id, datas);
        /* istanbul ignore if  */
        if (!updatedUser.success) return httpMsg.http422(updatedUser.msgError, errCode);
        user = { id: existUser.data.id };
    }

    // Send confirmation email
    // const resultSendEmail = await sendEmail(datas);
    // if (!resultSendEmail.success) {
    //     return httpMsg.http422(msgErrorSendingEmail, errCode);
    // }

    return httpMsg.http201(user);
};

const requiredDatas = async (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.name) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.phone) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.accountName) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.accountLocationState) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.password) return { success: false, msgError: msgErrorDataMissing };

    return { success: true, msgError: '' };
};

const getUser = async (email: string) => {
    const result = await servFindOneUser(email, 'email', { id: true, isRegistered: true }, false);

    /* istanbul ignore if */
    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    if (!result.data)
        return {
            success: true,
            data: null,
            msgError: '',
        };

    if (result.data && !result.data.isRegistered)
        return {
            success: true,
            data: result.data,
            msgError: '',
        };

    if (result.data && result.data.isRegistered)
        return {
            success: false,
            data: result.data,
            msgError: msgErrorUserAlreadyExist,
        };

    /* istanbul ignore next */
    return { success: false, data: null, msgError: msgErrorCheckUser };
};

const createUser = async (datas: any) => {
    const result = await servCreateUser(datas);

    /* istanbul ignore if */
    if (!result.success || !result.data)
        return { success: false, data: null, msgError: msgErrorSaveUser };

    return { success: true, data: result.data, msgError: '' };
};

const updateUser = async (id: string, datas: any) => {
    const result = await servUpdateUser(id, datas);

    /* istanbul ignore if */
    if (!result.success || !result.data)
        return { success: false, data: null, msgError: msgErrorUpdateUser };
    /* istanbul ignore if */
    if (!result.data) return { success: false, data: null, msgError: msgErrorUserNotFound };
    /* istanbul ignore if */
    if (result.data < 1) return { success: false, data: null, msgError: msgErrorUserNotFound };

    return { success: true, data: result.data, msgError: '' };
};

const hashUserPassword = async (password: string) => {
    let pwd = password;

    const resultHashPassword = await servHashPassword(pwd);

    /* istanbul ignore if  */
    if (!resultHashPassword.success || !resultHashPassword.data) {
        return { success: false, data: null, msgError: msgErrorHashPassword };
    }

    pwd = resultHashPassword.data;

    return { success: true, data: pwd, msgError: '' };
};
