import httpMsg from '@utils/http_messages/http_msg';
import servFindOneUser from '@services/users/user_get_one_service';
import servCheckPassword from '@functions/check_password';
import servGenerateToken from '@functions/generate_token_access';

const errorCod = 'ERROR_USER_LOGIN';
const errorMsg = 'Failed to authenticate';
const errorMsgDeleted = 'Failed to register a deleted user';
const errorMsgDisabled = 'Failed to register a disabled user';
const errorMsgRegistered = 'Failed to register an already registered user';

export default async (data: any) => {
    let userLogged = {};

    // Check required user data
    if (!checkRequiredDatas(data)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser(data.email);
    if (!user.success) return httpMsg.http401(errorCod);

    // Check password
    const checkedPassword = await checkPassword(data.password, user.data.password);
    if (!checkedPassword) return httpMsg.http401(errorCod);

    // Generate token access
    const generatedToken = await generateToken(user.data);
    if (!generatedToken.success) return httpMsg.http401(errorCod);

    // User data
    userLogged = {
        email: user.data.email,
        name: user.data.name,
        token: generatedToken.data,
    };

    // Success HTTP return
    return httpMsg.http200(userLogged);
};

const checkRequiredDatas = (datas: any) => /* istanbul ignore next */ {
    if (!datas.email) return false;
    if (!datas.password) return false;

    return true;
};

const getUser = async (email: string) => {
    const whereBy = 'email';

    const select = {
        id: true,
        name: true,
        email: true,
        password: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
    };

    // Get user by email
    const result = await servFindOneUser(email, whereBy, select, false);

    // Check user status
    if (!result.success) return { success: false, data: null, error: errorMsg };
    if (!result.data) return { success: false, data: null, error: errorMsg }; // Need to exist
    if (!result.data.password) return { success: false, data: null, error: errorMsg }; // Need to have a password
    if (result.data.isDeleted) return { success: false, data: null, error: errorMsgDeleted }; // Need not to be excluded
    if (result.data.isDisabled) return { success: false, data: null, error: errorMsgDisabled }; // Need to be enabled
    if (!result.data.isRegistered) return { success: false, data: null, error: errorMsgRegistered }; // Need to be registered

    return { success: true, data: result.data, error: null };
};

const checkPassword = async (plainPassword: string, hashPassword: string) => {
    const result = await servCheckPassword(plainPassword, hashPassword);

    if (!result.success) return false;

    return true;
};

const generateToken = async (datas: any) => {
    const result = await servGenerateToken(datas.id, datas.name, datas.email, datas.avatar);

    /* istanbul ignore if */
    if (!result.success) return { success: false, data: null };

    return { success: true, data: result.data };
};
