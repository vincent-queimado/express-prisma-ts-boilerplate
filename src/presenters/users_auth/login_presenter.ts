import httpMsg from '@utils/http_messages/http_msg';
import servFindOneUser from '@services/users/get_user_service';
import servCheckPassword from '@functions/check_password';
import servGenerateToken from '@functions/generate_token_access';

const errCode = 'ERROR_USER_LOGIN';

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
    /* istanbul ignore if */
    if (!required.success) return httpMsg.http401(errCode);

    // Check existing User
    const existUser = await getUser(datas.email);
    /* istanbul ignore if */
    if (!existUser.success) return httpMsg.http401(errCode);

    // Check password
    const checkedPassword = await checkPassword(datas.password, existUser.data.password);
    /* istanbul ignore if */
    if (!checkedPassword.success) return httpMsg.http401(errCode);

    // Generate token access
    const generatedToken = await generateToken(existUser.data);
    /* istanbul ignore if */
    if (!generatedToken.success) return httpMsg.http401(errCode);

    user = {
        token: generatedToken.data,
        name: existUser.data.name,
        email: existUser.data.email,
    };

    return httpMsg.http200(user);
};

const requiredDatas = async (datas: any) => {
    /* istanbul ignore if */
    if (!datas.email) return { success: false, msgError: msgErrorDataMissing };
    /* istanbul ignore if */
    if (!datas.password) return { success: false, msgError: msgErrorDataMissing };
    /* istanbul ignore next */
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
            password: true,
            isDisabled: false,
            isRegistered: true,
            createdAt: true,
        },
        false,
    );

    /* istanbul ignore if */
    if (!result.success) return { success: false, data: null, msgError: msgErrorCheckUser };

    if (!result.data)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotFound,
        };

    if (result.data && !result.data.isRegistered)
        return {
            success: false,
            data: null,
            msgError: msgErrorUserNotRegistered,
        };

    if (result.data && result.data.isRegistered)
        return {
            success: true,
            data: result.data,
            msgError: '',
        };

    /* istanbul ignore next */
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

    /* istanbul ignore if */
    if (!result.success) {
        return { success: false, data: null, msgError: msgErrorUserToken };
    }

    return { success: true, data: result.data, msgError: '' };
};
