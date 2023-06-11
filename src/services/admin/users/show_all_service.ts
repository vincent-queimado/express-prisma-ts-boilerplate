import httpMsg from '@utils/http_messages/http_msg';
import findAll from '@dao/users/user_get_all_dao';

const errCode = 'ERROR_USERS_GET_ALL';
const msgError = 'Failed to get all users';

export default async () => {
    const where = {};

    const select = {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        accountType: true,
        isDisabled: true,
        isDeleted: true,
        isRegistered: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
    };

    const users = await getAllUsers(where, select);

    return httpMsg.http200(users.data);
};

const getAllUsers = async (where: object, select: object) => {
    const result = await findAll(where, select);

    /* istanbul ignore if  */
    if (!result.success || !result.data) httpMsg.http422(msgError, errCode);

    return { success: result.success, data: result.data, error: result.error };
};
