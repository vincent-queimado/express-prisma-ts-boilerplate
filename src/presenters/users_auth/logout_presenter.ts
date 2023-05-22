import httpMsg from '@utils/http_messages/http_msg';

export default async () => {
    const data = { token: null };

    return httpMsg.http200(data);
};
