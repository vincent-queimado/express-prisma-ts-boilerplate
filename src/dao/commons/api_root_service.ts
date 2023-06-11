import config from '@config/app';

export default () => {
    const baseApiUrl = config.api.prefix;
    const route = '/' + baseApiUrl + '/info';

    return { success: true, data: route, error: null };
};
