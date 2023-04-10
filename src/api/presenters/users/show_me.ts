import httpMsg from '@utils/http_messages/http_msg';
import findOne from '@services/users/get_by_field.js';

const errCode = 'ERROR_USER_FIND_ME';

export default async (id: number) => {
    // Check User ID
    if (!id) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Find User ID
    const result = await findOne(
        id,
        'id',
        [
            'password',
            'resetPasswordToken',
            'signupConfirmationToken',
            'enabled',
            'deleted',
            'deletedAt',
        ],
        false,
    );
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to find User.', errCode);
    }

    return httpMsg.http200(result.data);
};
