import config from '../../config/app/config_app.js';

const env = process.env.NODE_ENV || 'development';
const conf = config[env];

export default () => {
    let url;

    // eslint-disable-next-line no-unused-expressions
    conf.server.ssl === 'true'
        ? (url = `https://${conf.server.host}:${conf.server.port}`)
        : (url = `http://${conf.server.host}:${conf.server.port}`);

    return url;
};
