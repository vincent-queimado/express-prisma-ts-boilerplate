import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/update_user_service';
import servFindOneUser from '@services/users/get_user_service';
import sendEmail from '@utils/nodemailer/nodemailer/email_welcome';

const errCode = 'ERROR_USER_SIGNUP_CONFIRMATION';

const msgErrorDataMissing = 'User data missing.';
const msgErrorCheckUser = 'User check error.';
const msgErrorUserNotFound = 'User not found.';
const msgErrorUseAlreadyRegistered = 'User already registered';
const msgErrorCheckToken = 'Token error';
const msgErrorUpdateUser = 'User update error';
const msgErrorSendingEmail = 'Error to sending confirmation email';

export default async (userDatas: any) => {
    const datas = userDatas;
    let user = {};

    // Check required datas
    const required = await requiredDatas(datas);
    /* istanbul ignore if */
    if (!required.success) return httpMsg.http422(required.msgError, errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    /* istanbul ignore if */
    if (!existUser.success) return httpMsg.http422(existUser.msgError, errCode);

    // Compare signup token
    const checkedToken = await checkToken(datas.token, existUser.data.tokenOfRegisterConfirmation);
    /* istanbul ignore if */
    if (!checkedToken.success) return httpMsg.http422(checkedToken.msgError, errCode);

    // Update User
    const updatedUser = await updateUser(existUser.data.id, { isRegistered: true });
    /* istanbul ignore if */
    if (!updatedUser.success) return httpMsg.http422(updatedUser.msgError, errCode);
    user = { id: existUser.data.id };

    // Send welcome email
    // const resultSendEmail = await sendEmail(existUser.data);
    // if (!resultSendEmail.success) {
    //     return httpMsg.http422(msgErrorSendingEmail, errCode);
    // }

    // return httpMsg.http200({ email: datas.email, isRegistered: 'confirmed' });
    return httpMsg.http200(user);
};

const requiredDatas = async (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.token) return { success: false, msgError: msgErrorDataMissing };

    return { success: true, msgError: '' };
};

const getUser = async (email: string) => {
    const result = await servFindOneUser(
        email,
        'email',
        {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            accountType: true,
            tokenOfRegisterConfirmation: true,
            isDisabled: false,
            isRegistered: true,
            createdAt: true,
        },
        false,
    );

    /* istanbul ignore if */
    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    /* istanbul ignore if */
    if (!result.data)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotFound,
        };

    if (result.data && result.data.isRegistered)
        return {
            success: false,
            data: null,
            msgError: msgErrorUseAlreadyRegistered,
        };

    if (result.data && result.data.tokenOfRegisterConfirmation)
        return {
            success: true,
            data: result.data,
            msgError: '',
        };

    /* istanbul ignore next */
    return { success: false, data: null, msgError: msgErrorCheckUser };
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

const checkToken = async (token: string, signupToken: string) => {
    if (token === signupToken) {
        return { success: true, msgError: '' };
    }
    return { success: false, msgError: msgErrorCheckToken };
};
