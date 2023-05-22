import httpMsg from '@utils/http_messages/http_msg';
import findOne from '@services/users/get_user_service';

const errCode = 'ERROR_USER_FIND_ME';

export default async (id: string) => {
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
            'tokenOfResetPassword',
            'tokenOfRegisterConfirmation',
            'isDisabled',
            'isDeleted',
            'deletedAt',
        ],
        false,
    );
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to find User.', errCode);
    }

    return httpMsg.http200(result.data);
};
