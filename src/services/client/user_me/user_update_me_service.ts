import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@dao/users/user_update_dao';
import servHashPassword from '@functions/generate_hash_password';
import servFindOneUser from '@dao/users/user_get_one_dao';

const errorCod = 'ERROR_USER_UPDATE_ME';
const errorMsg = 'Failed to update user';

export default async (id: string, data: any) => {
    // Check required user data
    if (!checkRequiredDatas(id)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser({ id, isDeleted: false, isRegistered: true });
    if (!user.success) return httpMsg.http422(user.error || '', errorCod);

    const filtered = await filterDatas(data);
    if (!filtered.success) return httpMsg.http422(errorMsg, errorCod);

    // Update the user
    const updated = await updateUser(user.data.id, filtered.data);
    if (!updated.success) return httpMsg.http422(errorMsg, errorCod);

    return httpMsg.http200(updated.data);
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

    // Check user status
    if (!result.success || !result.data) return { success: false, data: null, error: errorMsg };

    return { success: true, data: result.data, error: null };
};

const updateUser = async (id: string, datas: any) => {
    const select = {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        accountType: true,
        createdAt: true,
    };

    const result = await servUpdateUser(id, datas, select);

    /* istanbul ignore if */
    if (!result.success || !result.data) return { success: false, data: null };

    return { success: true, data: result.data };
};

const filterDatas = async (data: any) => {
    const dataFiltered: any = {};

    if (data.name) dataFiltered.name = data.name;
    if (data.email) dataFiltered.email = data.email;

    // Hash password
    if (data.password) {
        const resultHashPassword = await servHashPassword(data.password);
        /* istanbul ignore if */
        if (!resultHashPassword.success || !resultHashPassword.data) {
            return { success: false, data: null };
        }
        dataFiltered.password = resultHashPassword.data;
    }

    return { success: true, data: dataFiltered };
};
