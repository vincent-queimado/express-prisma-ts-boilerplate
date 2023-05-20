// import moment from 'moment';

// import config from '@config/app/index';
import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/update_user_service';
import servFindOneUser from '@services/users/get_user_service';
import servHashPassword from '@functions/generate_hash_password';

const errCode = 'ERROR_USER_FORGOT_PASSWORD_RESET';

export default async (data: any) => {
    // Check User data
    if (!data.email || !data.token || !data.password) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Check existing User
    const resultFindUser = await servFindOneUser(
        data.email,
        'email',
        ['password', 'tokenOfRegisterConfirmation', 'isDeleted'],
        false,
    );
    if (!resultFindUser.success) {
        return httpMsg.http422('Error to check existing User.', errCode);
    }
    if (!resultFindUser.data) {
        return httpMsg.http422('Reset password error.', errCode);
    }

    // Check time of last request
    // if (
    //     moment().isAfter(
    //         moment(resultFindUser.data.updatedAt).add(
    //             config.app.forgotPassword.resetPasswordExpired,
    //             'hours',
    //         ),
    //     )
    // ) {
    //     return httpMsg.http422('Confirmation time expired.', errCode);
    // }

    // Check User token
    if (resultFindUser.data.tokenOfResetPassword !== data.token) {
        return httpMsg.http422('Reset password error.', errCode);
    }

    // Hash password
    const resultHashPassword = await servHashPassword(data.password);
    if (!resultHashPassword.success || !resultHashPassword.data) {
        return httpMsg.http422('Error to hash the user password.', errCode);
    }
    data.password = resultHashPassword.data;

    // Update signup confirmation status
    const result = await servUpdateUser(resultFindUser.data.id, { password: data.password });
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to update User.', errCode);
    }

    return httpMsg.http200({ email: data.email });
};