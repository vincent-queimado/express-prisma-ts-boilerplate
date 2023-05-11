import httpMsg from '@utils/http_messages/http_msg';
import servCreateUser from '@services/users/save_service';
import servFindOneUser from '@services/users/get_by_field_service';
import servCreatePassword from 'src/functions/generate_password';

const errCode = 'ERROR_USER_AUTH_SIGNOUT';

export default async (data: any) => {
    // Check User data
    if (!data.name || !data.email) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Check existing User
    const resultFindUser = await servFindOneUser(
        data.email,
        'email',
        ['password', 'resetPasswordToken', 'signupConfirmationToken', 'deleted'],
        false,
    );
    if (!resultFindUser.success) {
        return httpMsg.http422('Error to check existing user.', errCode);
    }
    if (resultFindUser.data) {
        return httpMsg.http422('User already exist.', errCode);
    }

    // Generate User password
    const resultCreatePassword = await servCreatePassword();
    if (!resultCreatePassword.success || !resultCreatePassword.data) {
        return httpMsg.http422('Error to generate User password.', errCode);
    }
    data.password = resultCreatePassword.data;

    // Create new User
    const resultCreateNewUser = await servCreateUser(data);
    if (!resultCreateNewUser.success || !resultCreateNewUser.data) {
        return httpMsg.http422('Error to save data User.', errCode);
    }

    if (resultCreateNewUser.data.dataValues.password !== undefined) {
        delete resultCreateNewUser.data.dataValues.password;
    }
    if (resultCreateNewUser.data.dataValues.resetPasswordToken !== undefined) {
        delete resultCreateNewUser.data.dataValues.resetPasswordToken;
    }
    if (resultCreateNewUser.data.dataValues.signupConfirmationToken !== undefined) {
        delete resultCreateNewUser.data.dataValues.signupConfirmationToken;
    }
    if (resultCreateNewUser.data.dataValues.deleted !== undefined) {
        delete resultCreateNewUser.data.dataValues.deleted;
    }

    return httpMsg.http200(resultCreateNewUser.data);
};
