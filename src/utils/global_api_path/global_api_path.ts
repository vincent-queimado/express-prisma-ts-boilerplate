import config from '@config/app';

export default () => {
    let path = '';

    /* istanbul ignore next */
    if (config.api.prefix) path = `/${config.api.prefix}`;
    if (config.api.prefix) path += `/${config.api.version}`;

    return path;
};
