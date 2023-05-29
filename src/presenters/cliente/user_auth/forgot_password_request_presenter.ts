import randtoken from 'rand-token';

import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/user_update_service';
import servFindOneUser from '@services/users/user_get_one_service';
// import sendEmail from '@utils/nodemailer/nodemailer/email_verification';

const errorCod = 'ERROR_USER_FORGOT_PASSWORD_REQUEST';
const errorMsg = 'Failed to request forgot password';
const errorMsgDeleted = 'Failed to register a deleted user';
const errorMsgDisabled = 'Failed to register a disabled user';
const errorMsgRegistered = 'Failed to register an already registered user';

const isEmailNotif = false;

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser(data.email);
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    // Check if user is already confirmed
    if (!getRegisterConfirmation(user.data.isRegistered))
        return httpMsg.http422(errorMsg, errorCod);

    // Update user reset password token
    if (!updateUserToken(user.data.id)) return httpMsg.http422(errorMsg, errorCod);

    // Send Email
    if (isEmailNotif) await sendEmail(user.data);

    // Success HTTP return
    return httpMsg.http200({ email: user.data.email, isEmailNotif });
};

const checkRequiredDatas = (data: any) => /* istanbul ignore next */ {
    if (!data.email) return false;

    return true;
};

const getUser = async (email: string) => {
    const whereBy = 'email';

    const select = {
        id: true,
        name: true,
        email: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
        tokenOfResetPassword: true,
    };

    // Get user by email
    const result = await servFindOneUser(email, whereBy, select, false);

    // Check user status
    if (!result.success) return { success: false, data: null, error: errorMsg };
    if (!result.data) return { success: false, data: null, error: errorMsg }; // Need to exist
    if (!result.data.tokenOfResetPassword) return { success: false, data: null, error: errorMsg }; // Need to have a reset password token
    if (result.data.isDeleted) return { success: false, data: null, error: errorMsgDeleted }; // Need not to be excluded
    if (result.data.isDisabled) return { success: false, data: null, error: errorMsgDisabled }; // Need to be enabled
    if (!result.data.isRegistered) return { success: false, data: null, error: errorMsgRegistered }; // Need to be registered

    return { success: true, data: result.data, error: null };
};

const getRegisterConfirmation = (isRegistered: boolean) => {
    if (!isRegistered) return false;
    return true;
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

const sendEmail = async (user: any) => {
    // const result = await sendEmail(user);
    // if (!result.success) return httpMsg.http422(errorMsg, errorCod);
};
