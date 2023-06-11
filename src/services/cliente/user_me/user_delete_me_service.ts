import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@dao/users/user_update_dao';
import servFindOneUser from '@dao/users/user_get_one_dao';

const errorCod = 'ERROR_USER_DELETE_ME';
const errorMsg = 'Failed to delete user';

export default async (id: string) => {
    // Check required user data
    if (!checkRequiredDatas(id)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser({ id, isDeleted: false, isRegistered: true });
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    // Update the user
    const updated = await updateUser(user.data.id, { isDeleted: true });
    if (!updated.success) return httpMsg.http422(errorMsg, errorCod);

    return httpMsg.http204(updated.data);
};

const checkRequiredDatas = (id: string) => /* istanbul ignore next */ {
    if (!id) return false;
    return true;
};

const getUser = async (where: object) => {
    const select = {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        accountType: true,
        createdAt: true,
    };

    // Get user by email
    const result = await servFindOneUser(where, select);
    if (!result.success || !result.data) return { success: false, data: null, error: errorMsg };

    return { success: true, data: result.data, error: null };
};

const updateUser = async (id: string, datas: any) => {
    const select = {
        id: true,
        isDeleted: true,
    };

    const result = await servUpdateUser(id, datas, select);

    /* istanbul ignore if */
    if (!result.success || !result.data) return { success: false, data: null };

    return { success: true, data: result.data };
};
