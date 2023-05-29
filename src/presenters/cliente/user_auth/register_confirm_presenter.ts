import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/user_update_service';
import servFindOneUser from '@services/users/user_get_one_service';
// import sendEmail from '@utils/nodemailer/nodemailer/email_welcome';

const errorCod = 'ERROR_USER_SIGNUP_CONFIRMATION';
const errorMsg = 'Failed to confirm registration';
const errorMsgDeleted = 'Failed to register a deleted user';
const errorMsgDisabled = 'Failed to register a disabled user';
const errorMsgRegistered = 'Failed to confirm an already registered user';

const isEmailNotif = false;

export default async (data: any) => {
    // Check required user data
    if (!checkRequiredDatas(data)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser(data.email);
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    // Check user token
    if (!checkToken(data.token, user.data.tokenOfRegisterConfirmation))
        return httpMsg.http422(errorMsg, errorCod);

    // Update the user registration status
    const updated = await updateUser(user.data.id, { isRegistered: true });
    if (!updated.success) return httpMsg.http422(errorMsg, errorCod);

    // Send Email
    if (isEmailNotif) await sendEmail(user.data);

    return httpMsg.http200({ email: user.data.email, isRegistered: true });
};

const checkRequiredDatas = (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return false;
    if (!datas.token) return false;

    return true;
};

const getUser = async (email: string) => {
    const whereBy = 'email';

    const select = {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        accountType: true,
        password: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
        tokenOfRegisterConfirmation: true,
        createdAt: true,
    };

    // Get user by email
    const result = await servFindOneUser(email, whereBy, select, false);

    // Check user status
    if (!result.success) return { success: false, data: null, error: errorMsg };
    if (!result.data) return { success: false, data: null, error: errorMsg }; // Need to exist
    if (!result.data.tokenOfRegisterConfirmation)
        return { success: false, data: null, error: errorMsg }; // Need to have a token
    if (result.data.isDeleted) return { success: false, data: null, error: errorMsgDeleted }; // Need not to be excluded
    if (result.data.isDisabled) return { success: false, data: null, error: errorMsgDisabled }; // Need to be enabled
    if (result.data.isRegistered) return { success: false, data: null, error: errorMsgRegistered }; // Need not to be registered

    return { success: true, data: result.data, error: null };
};

const updateUser = async (id: string, datas: any) => {
    const select = {
        id: true,
        isRegistered: true,
    };

    const result = await servUpdateUser(id, datas, select);

    /* istanbul ignore if */
    if (!result.success || !result.data) return { success: false, data: null };

    return { success: true, data: result.data };
};

const checkToken = (inputToken: string, token: string) => {
    if (inputToken !== token) return false;

    return true;
};

const sendEmail = async (user: any) => {
    // const result = await sendEmail(user);
    // if (!result.success) return httpMsg.http422(errorMsg, errorCod);
};
