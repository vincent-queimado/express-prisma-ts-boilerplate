import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@dao/users/user_update_service';
import servFindOneUser from '@dao/users/user_get_one_service';
import servHashPassword from '@functions/generate_hash_password';
// import sendEmail from '@utils/nodemailer/nodemailer/email_verification';

const errorCod = 'ERROR_USER_FORGOT_PASSWORD_RESET';
const errorMsg = 'Failed to reset forgot password';

const isEmailNotif = false;

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser({ email: data.email, isDeleted: false, isRegistered: true });
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    // Check if user token is correct
    if (!checkUserToken(user.data.tokenOfResetPassword, data.token))
        return httpMsg.http422(errorMsg, errorCod);

    // Update user with new password
    await updateUserPassword(user.data.id, data.password);

    // Send Email
    if (isEmailNotif) await sendEmail(user.data);

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
    if (!result.success || !result.data) return { success: false, data: null, error: errorMsg };
    if (!result.data.tokenOfResetPassword) return { success: false, data: null, error: errorMsg }; // Need to have a reset password token

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
    if (!hashed.success || !hashed.data) return httpMsg.http422(errorMsg, errorCod);

    // Update user password
    const updated = await servUpdateUser(id, { password: hashed.data }, select);
    if (!updated.success) return httpMsg.http422(errorMsg, errorCod);
};

const sendEmail = async (user: any) => {
    // const result = await sendEmail(user);
    // if (!result.success) return httpMsg.http422(errorMsg, errorCod);
};
