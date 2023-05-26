import httpMsg from '@utils/http_messages/http_msg';
import findOne from '@services/users/user_get_one_service';

const errCode = 'ERROR_USER_FIND_ME';

export default async (id: string) => {
    // Check User ID
    /* istanbul ignore if */
    if (!id) {
        return httpMsg.http422('User data missing.', errCode);
    }

    // Find User ID
    const result = await findOne(
        id,
        'id',
        {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
            accountType: true,
            isDisabled: false,
            isRegistered: true,
            createdAt: true,
        },
        false,
    );

    /* istanbul ignore if */
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to find User.', errCode);
    }

    return httpMsg.http200(result.data);
};
