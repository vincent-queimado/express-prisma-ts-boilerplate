import httpMsg from '@utils/http_messages/http_msg';
import servUpdateUser from '@services/users/update';
import servHashPassword from '@services/tools/generate_hash_password';

const errCode = 'ERROR_USER_UPDATE_ME';

export default async (id: number, data: any) => {
    // Check User data
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
        if (!resultHashPassword.success || !resultHashPassword.data) {
            return { success: false, data: null, error: 'Eror to hash password' };
        }
        dataFiltered.password = resultHashPassword.data;
    }

    // Update User
    const result = await servUpdateUser(id, dataFiltered);
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to update User.', errCode);
    }

    if (result.data[1][0].dataValues.password !== undefined) {
        delete result.data[1][0].dataValues.password;
    }
    if (result.data[1][0].dataValues.resetPasswordToken !== undefined) {
        delete result.data[1][0].dataValues.resetPasswordToken;
    }
    if (result.data[1][0].dataValues.signupConfirmationToken !== undefined) {
        delete result.data[1][0].dataValues.signupConfirmationToken;
    }
    if (result.data[1][0].dataValues.enabled !== undefined) {
        delete result.data[1][0].dataValues.enabled;
    }
    if (result.data[1][0].dataValues.deleted !== undefined) {
        delete result.data[1][0].dataValues.deleted;
    }
    if (result.data[1][0].dataValues.deletedAt !== undefined) {
        delete result.data[1][0].dataValues.deletedAt;
    }

    return httpMsg.http200(result.data[1][0]);
};
