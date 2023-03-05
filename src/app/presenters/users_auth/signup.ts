import randtoken from 'rand-token';

import httpMsg from '../../../utils/http_messages/http_msg';
import servCreateUser from '../../services/users/save';
import servUpdateUser from '../../services/users/update';
import servFindOneUser from '../../services/users/get_by_field';
import servHashPassword from '../../services/tools/generate_hash_password';
import sendEmail from '../../../utils/nodemailer/nodemailer/email_verification';

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
    if (!required.success) return httpMsg.http422(required.msgError, errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    if (!existUser.success) return httpMsg.http422(existUser.msgError, errCode);

    // Create User if not exist
    if (!existUser.data) {
        // Hash password
        const hashedPassword = await hashUserPassword(datas.password);
        if (!hashedPassword.success || !hashedPassword.data) {
            return httpMsg.http422(hashedPassword.msgError, errCode);
        }
        datas.password = hashedPassword.data;

        // Generate signup token
        datas.signupConfirmationToken = await randtoken.suid(16);
        datas.resetPasswordToken = await randtoken.suid(16);

        // Create new User
        const createdUser = await createUser(datas);
        if (!createdUser.success) return httpMsg.http422(createdUser.msgError, errCode);
        user = { id: createdUser.data.id };
    }

    // Update User if exist with your signup is not complete
    if (existUser.data && !existUser.data.signupConfirmationComplete) {
        // Hash password
        const hashedPassword = await hashUserPassword(datas.password);
        if (!hashedPassword.success || !hashedPassword.data) {
            return httpMsg.http422(hashedPassword.msgError, errCode);
        }
        datas.password = hashedPassword.data;

        // Generate signup token
        datas.signupConfirmationToken = await randtoken.suid(16);
        datas.resetPasswordToken = await randtoken.suid(16);

        // Update User
        const updatedUser = await updateUser(existUser.data.id, datas);
        if (!updatedUser.success) return httpMsg.http422(updatedUser.msgError, errCode);
        user = { id: existUser.data.id };
    }

    // Send confirmation email
    const resultSendEmail = await sendEmail(datas);
    if (!resultSendEmail.success) {
        return httpMsg.http422(msgErrorSendingEmail, errCode);
    }

    return httpMsg.http201(user);
};

const requiredDatas = async (datas: any) => {
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.name) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.phone) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.accountName) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.accountLocationState) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.password) return { success: false, msgError: msgErrorDataMissing };

    return { success: true, msgError: null };
};

const getUser = async (email: string) => {
    const result = await servFindOneUser(
        email,
        'email',
        ['password', 'signupConfirmationToken', 'resetPasswordToken'],
        false,
    );

    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    if (!result.data)
        return {
            success: true,
            data: null,
            msgError: null,
        };

    if (result.data && !result.data.dataValues.signupConfirmationComplete)
        return {
            success: true,
            data: result.data.dataValues,
            msgError: null,
        };

    if (result.data && result.data.dataValues.signupConfirmationComplete)
        return {
            success: false,
            data: result.data.dataValues,
            msgError: msgErrorUserAlreadyExist,
        };

    return { success: false, data: null, msgError: msgErrorCheckUser };
};

const createUser = async (datas: any) => {
    const result = await servCreateUser(datas);

    if (!result.success || !result.data)
        return { success: false, data: null, msgError: msgErrorSaveUser };

    return { success: true, data: result.data, msgError: null };
};

const updateUser = async (id: number, datas: any) => {
    const result = await servUpdateUser(id, datas);

    if (!result.success || !result.data)
        return { success: false, data: null, msgError: msgErrorUpdateUser };

    if (!result.data) return { success: false, data: null, msgError: msgErrorUserNotFound };

    if (result.data < 1) return { success: false, data: null, msgError: msgErrorUserNotFound };

    return { success: true, data: result.data, msgError: null };
};

const hashUserPassword = async (password: string) => {
    let pwd = password;

    const resultHashPassword = await servHashPassword(pwd);

    if (!resultHashPassword.success || !resultHashPassword.data) {
        return httpMsg.http422(msgErrorHashPassword, errCode);
    }

    pwd = resultHashPassword.data;

    return { success: true, data: pwd, msgError: null };
};
