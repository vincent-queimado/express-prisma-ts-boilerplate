import config from '@config/app';

export default () => {
    let url;

    /* istanbul ignore next */
    config.app.ssl === true
        ? (url = `https://${config.app.host}:${config.app.port}`)
        : (url = `http://${config.app.host}:${config.app.port}`);

    return url;
};
