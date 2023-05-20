import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/logical_delete_user_service';
import servFindOneUser from '@services/users/get_user_service';

const errCode = 'ERROR_USER_DELETE_ME';

export default async (id: string) => {
    // Check User data
    if (!id) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Check existing User
    const resultFindUser = await servFindOneUser(
        id,
        'id',
        ['password', 'tokenOfResetPassword', 'tokenOfRegisterConfirmation', 'isDeleted'],
        false,
    );
    if (!resultFindUser.success) {
        return httpMsg.http422('Error to check existing User.', errCode);
    }
    if (!resultFindUser.data) {
        return httpMsg.http422('User not exist or already deleted.', errCode);
    }

    // Disable User
    const resultUpdateUser = await servUpdateUser(id);
    if (!resultUpdateUser.success || !resultUpdateUser.data) {
        return httpMsg.http422('Error to update User.', errCode);
    }

    if (resultUpdateUser.data[1][0].dataValues.password !== undefined) {
        delete resultUpdateUser.data[1][0].dataValues.password;
    }
    if (resultUpdateUser.data[1][0].dataValues.tokenOfResetPassword !== undefined) {
        delete resultUpdateUser.data[1][0].dataValues.tokenOfResetPassword;
    }
    if (resultUpdateUser.data[1][0].dataValues.tokenOfRegisterConfirmation !== undefined) {
        delete resultUpdateUser.data[1][0].dataValues.tokenOfRegisterConfirmation;
    }

    return httpMsg.http200(resultUpdateUser.data[1][0]);
};
