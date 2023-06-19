import constError from '@constants/error_constant';
import httpMsg from '@utils/http_messages/http_msg';
import servFindOneUser from '@dao/users/user_get_one_dao';
import servCheckPassword from '@functions/check_password';
import servGenerateToken from '@functions/generate_token_access';

export default async (data: any) => {
    let userLogged = {};

    // Check required user data
    if (!checkRequiredDatas(data))
        return httpMsg.http422(constError.LOGIN_MSG.failToLogin, constError.ERROR_CODE.login);

    // Check existing user and get data
    const user = await getUser({
        email: data.email,
        isDeleted: false,
        isRegistered: true,
    });
    if (!user.success) return httpMsg.http401(constError.ERROR_CODE.login);

    // Check password
    const checkedPassword = await checkPassword(data.password, user.data.password);
    if (!checkedPassword) return httpMsg.http401(constError.ERROR_CODE.login);

    // Generate token access
    const generatedToken = await generateToken(user.data);
    if (!generatedToken.success) return httpMsg.http401(constError.ERROR_CODE.login);

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

const getUser = async (where: object) => {
    const select = {
        id: true,
        name: true,
        email: true,
        password: true,
    };

    // Get user by email
    const result = await servFindOneUser(where, select);

    // Check user status
    if (!result.success || !result.data)
        return { success: false, data: null, error: constError.LOGIN_MSG.failToLogin };
    if (!result.data.password)
        return { success: false, data: null, error: constError.LOGIN_MSG.failToLogin }; // Need to have a password

    return { success: true, data: result.data, error: null };
};

const checkPassword = async (plainPassword: string, hashPassword: string) => {
    const result = await servCheckPassword(plainPassword, hashPassword);
    if (!result.success) return false;

    return true;
};

const generateToken = async (datas: any) => {
    const tokenData = {
        id: datas.id,
        name: datas.name,
        email: datas.email,
        avatar: datas.avatar,
    };

    const result = await servGenerateToken(tokenData);

    /* istanbul ignore if */
    if (!result.success) return { success: false, data: null };

    return { success: true, data: result.data };
};
