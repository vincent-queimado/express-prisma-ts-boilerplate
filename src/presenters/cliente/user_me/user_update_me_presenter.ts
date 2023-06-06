import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/user_update_service';
import servHashPassword from '@functions/generate_hash_password';
import servFindOneUser from '@services/users/user_get_one_service';

const errorCod = 'ERROR_USER_UPDATE_ME';
const errorMsg = 'Failed to update user';
const errorMsgDeleted = 'Failed to register a deleted user';
const errorMsgDisabled = 'Failed to register a disabled user';
const errorMsgRegistered = 'Failed to register an already registered user';

export default async (id: string, data: any) => {
    // Check required user data
    if (!checkRequiredDatas(id)) return httpMsg.http422(errorMsg, errorCod);

    // Check existing user and get data
    const user = await getUser(id);
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

const getUser = async (id: string) => {
    const whereBy = 'id';

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
    };

    // Get user by email
    const result = await servFindOneUser(id, whereBy, select, false);

    // Check user status
    if (!result.success) return { success: false, data: null, error: errorMsg };
    if (!result.data) return { success: false, data: null, error: errorMsg }; // Need to exist
    if (result.data.isDeleted) return { success: false, data: null, error: errorMsgDeleted }; // Need not to be excluded
    if (result.data.isDisabled) return { success: false, data: null, error: errorMsgDisabled }; // Need to be enabled
    if (!result.data.isRegistered) return { success: false, data: null, error: errorMsgRegistered }; // Need to be registered

    delete result.data.isDeleted;
    delete result.data.isDisabled;
    delete result.data.isRegistered;

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
