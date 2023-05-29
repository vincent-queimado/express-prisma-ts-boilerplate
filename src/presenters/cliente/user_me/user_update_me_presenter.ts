import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/user_update_service';
import servHashPassword from '@functions/generate_hash_password';

const errCode = 'ERROR_USER_UPDATE_ME';

export default async (id: string, data: any) => {
    const select = {
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
    };

    // Check User data
    /* istanbul ignore if */
    if (!id || !Object.keys(data).length) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Data filter
    const dataFiltered: any = {};

    if (data.name) {
        dataFiltered.name = data.name;
    }
    if (data.email) {
        dataFiltered.email = data.email;
    }

    // Hash password
    if (data.password) {
        const resultHashPassword = await servHashPassword(data.password);
        /* istanbul ignore if */
        if (!resultHashPassword.success || !resultHashPassword.data) {
            return { success: false, data: null, error: 'Eror to hash password' };
        }
        dataFiltered.password = resultHashPassword.data;
    }

    // Update User
    const result = await servUpdateUser(id, dataFiltered, select);
    /* istanbul ignore if */
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to update User.', errCode);
    }

    if (result.data.password !== undefined) {
        delete result.data.password;
    }
    if (result.data.tokenOfResetPassword !== undefined) {
        delete result.data.tokenOfResetPassword;
    }
    if (result.data.tokenOfRegisterConfirmation !== undefined) {
        delete result.data.tokenOfRegisterConfirmation;
    }
    if (result.data.isDisabled !== undefined) {
        delete result.data.isDisabled;
    }
    if (result.data.isDeleted !== undefined) {
        delete result.data.isDeleted;
    }
    if (result.data.deletedAt !== undefined) {
        delete result.data.deletedAt;
    }

    return httpMsg.http200(result.data);
};
