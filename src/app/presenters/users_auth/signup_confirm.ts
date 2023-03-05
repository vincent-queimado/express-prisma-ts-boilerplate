import httpMsg from '../../../utils/http_messages/http_msg';
import servUpdateUser from '../../services/users/update';
import servFindOneUser from '../../services/users/get_by_field';
import sendEmail from '../../../utils/nodemailer/nodemailer/email_welcome';

const errCode = 'ERROR_USER_SIGNUP_CONFIRMATION';

const msgErrorDataMissing = 'User data missing.';
const msgErrorCheckUser = 'Error to check user.';
const msgErrorUserNotFound = 'User not found.';
const msgErrorUseAlreadyRegistered = 'User already registered';
const msgErrorCheckToken = 'Error to check token.';
const msgErrorUpdateUser = 'Error to update user.';
const msgErrorSendingEmail = 'Error to sending confirmation email.';

export default async (userDatas: any) => {
    const datas = userDatas;
    let user = {};

    // Check required datas
    const required = await requiredDatas(datas);
    if (!required.success) return httpMsg.http422(required.msgError, errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    if (!existUser.success) return httpMsg.http422(existUser.msgError, errCode);

    // Compare signup token
    const checkedToken = await checkToken(datas.token, existUser.data.signupConfirmationToken);
    if (!checkedToken.success) return httpMsg.http422(checkedToken.msgError, errCode);

    // Update User
    const updatedUser = await updateUser(existUser.data.id, { signupConfirmationComplete: true });
    if (!updatedUser.success) return httpMsg.http422(updatedUser.msgError, errCode);
    user = { id: existUser.data.id };

    // Send welcome email
    const resultSendEmail = await sendEmail(existUser.data);
    if (!resultSendEmail.success) {
        return httpMsg.http422(msgErrorSendingEmail, errCode);
    }

    // return httpMsg.http200({ email: datas.email, signupConfirmationComplete: 'confirmed' });
    return httpMsg.http200(user);
};

const requiredDatas = async (datas: any) => {
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.token) return { success: false, msgError: msgErrorDataMissing };

    return { success: true, msgError: null };
};

const getUser = async (email: string) => {
    const result = await servFindOneUser(email, 'email', ['password', 'resetPasswordToken'], false);

    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    if (!result.data)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotFound,
        };

    if (result.data && result.data.signupConfirmationComplete)
        return {
            success: false,
            data: null,
            msgError: msgErrorUseAlreadyRegistered,
        };

    if (result.data && result.data.signupConfirmationToken)
        return {
            success: true,
            data: result.data,
            msgError: null,
        };

    return { success: false, data: null, msgError: msgErrorCheckUser };
};

const updateUser = async (id: number, datas: any) => {
    const result = await servUpdateUser(id, datas);

    if (!result.success || !result.data)
        return { success: false, data: null, msgError: msgErrorUpdateUser };

    if (!result.data) return { success: false, data: null, msgError: msgErrorUserNotFound };

    if (result.data < 1) return { success: false, data: null, msgError: msgErrorUserNotFound };

    return { success: true, data: result.data, msgError: null };
};

const checkToken = async (token: string, signupToken: string) => {
    if (token === signupToken) {
        return { success: true, msgError: null };
    }
    return { success: false, msgError: msgErrorCheckToken };
};
