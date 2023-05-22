import httpMsg from '@utils/http_messages/http_msg';
import servCreateUser from '@services/users/create_user_service';
import servFindOneUser from '@services/users/get_user_service';
import servCreatePassword from '@functions/generate_password';

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
        ['password', 'tokenOfResetPassword', 'tokenOfRegisterConfirmation', 'isDeleted'],
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
    if (resultCreateNewUser.data.dataValues.tokenOfResetPassword !== undefined) {
        delete resultCreateNewUser.data.dataValues.tokenOfResetPassword;
    }
    if (resultCreateNewUser.data.dataValues.tokenOfRegisterConfirmation !== undefined) {
        delete resultCreateNewUser.data.dataValues.tokenOfRegisterConfirmation;
    }
    if (resultCreateNewUser.data.dataValues.isDeleted !== undefined) {
        delete resultCreateNewUser.data.dataValues.isDeleted;
    }

    return httpMsg.http200(resultCreateNewUser.data);
};
