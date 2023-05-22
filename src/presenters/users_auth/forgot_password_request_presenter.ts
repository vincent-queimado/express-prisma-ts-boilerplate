import randtoken from 'rand-token';

import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/update_user_service';
import servFindOneUser from '@services/users/get_user_service';

const errCode = 'ERROR_USER_FORGOT_PASSWORD_REQUEST';

export default async (data: any) => {
    const dataFiltered: any = {};

    // Check User data
    if (!data.email) {
        return httpMsg.http422('User signup confirmation data missing.', errCode);
    }

    // Check existing User
    const resultFindUser = await servFindOneUser(
        data.email,
        'email',
        ['password', 'tokenOfResetPassword', 'isDeleted'],
        false,
    );
    if (!resultFindUser.success) {
        return httpMsg.http422('Error to check existing User.', errCode);
    }
    if (!resultFindUser.data) {
        return httpMsg.http422('Signup confirmation error.', errCode);
    }

    // Check if User is already confirmed
    if (resultFindUser.data.isRegistered === 'pending') {
        return httpMsg.http422('User has not verified their email address.', errCode);
    }

    // Generate token
    dataFiltered.tokenOfResetPassword = randtoken.suid(16);

    // Update token reset token
    const result = await servUpdateUser(resultFindUser.data.id, dataFiltered);
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to update User.', errCode);
    }

    // Send confirmation email
    dataFiltered.email = resultFindUser.data.email;
    dataFiltered.name = resultFindUser.data.name;
    // const resultSendEmail = await sendgrid.forgotPasswordRequest(dataFiltered);
    // if (!resultSendEmail.success) {
    //     return httpMsg.http422('Error to sending forgot password request email.', errCode);
    // }

    return httpMsg.http200({ email: data.email });
};
