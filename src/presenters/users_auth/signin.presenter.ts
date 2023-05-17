import httpMsg from '@utils/http_messages/http_msg';
import servFindOneUser from '@services/users/get_by_field_service';
import servCheckPassword from '@functions/check_password';
import servGenerateToken from '@functions/generate_token_access';

const errCode = 'ERROR_USER_SIGNIN';

const msgErrorDataMissing = 'User data missing.';
const msgErrorCheckUser = 'Error to check user.';
const msgErrorUserNotFound = 'User not found.';
const msgErrorUserNotRegistered = 'User not registered.';
const msgErrorUserInvalidPassword = 'Invalid password.';
const msgErrorUserToken = 'Error to generate token.';

export default async (userDatas: any) => {
    const datas = userDatas;
    let user = {};

    // Check required datas
    const required = await requiredDatas(datas);
    if (!required.success) return httpMsg.http401(errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    if (!existUser.success) return httpMsg.http401(errCode);

    // Check password
    const checkedPassword = await checkPassword(datas.password, existUser.data.password);
    if (!checkedPassword.success) return httpMsg.http401(errCode);

    // // Generate token access
    const generatedToken = await generateToken(datas);
    if (!generatedToken.success) return httpMsg.http401(errCode);

    user = {
        token: generatedToken.data,
        name: existUser.data.name,
        email: existUser.data.email,
    };

    return httpMsg.http200(user);
};

const requiredDatas = async (datas: any) => {
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    if (!datas.password) return { success: false, msgError: msgErrorDataMissing };

    return { success: true, msgError: '' };
};

const getUser = async (email: string) => {
    const result = await servFindOneUser(
        email,
        'email',
        ['signupConfirmationToken', 'resetPasswordToken'],
        false,
    );

    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    if (!result.data)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotFound,
        };

    if (result.data && !result.data.dataValues.signupConfirmationComplete)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotRegistered,
        };

    if (result.data && result.data.dataValues.signupConfirmationComplete)
        return {
            success: true,
            data: result.data.dataValues,
            msgError: '',
        };

    return { success: false, data: null, msgError: msgErrorCheckUser };
};

const checkPassword = async (password: string, hashPassword: string) => {
    const result = await servCheckPassword(password, hashPassword);

    if (!result.success) {
        return { success: false, msgError: msgErrorUserInvalidPassword };
    }

    return { success: true, msgError: '' };
};

const generateToken = async (datas: any) => {
    const result = await servGenerateToken(datas.id, datas.name, datas.email, datas.avatar);

    if (!result.success) {
        return { success: false, data: null, msgError: msgErrorUserToken };
    }

    return { success: true, data: result.data, msgError: '' };
};
