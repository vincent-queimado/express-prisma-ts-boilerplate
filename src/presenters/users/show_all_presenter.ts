import httpMsg from '@utils/http_messages/http_msg';
import findAll from '@services/users/get_all';

const errCode = 'ERROR_USERS_FIND_ALL';

export default async () => {
    // Find Users
    const result = await findAll();
    if (!result.success || !result.data) {
        return httpMsg.http422('Error to list users.', errCode);
    }

    return httpMsg.http200(result.data);
};
