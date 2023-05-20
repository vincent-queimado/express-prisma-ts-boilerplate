import globalApiPath from '@utils/global_api_path/global_api_path';

export default () => {
    const apiPath = globalApiPath();
    const route = `${apiPath}/info`;

    return { success: true, data: route, error: null };
};
