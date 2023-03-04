"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const app_1 = __importDefault(require("./app"));
const _index_1 = __importDefault(require("../config/app/_index"));
const logger_1 = __importDefault(require("../utils/winston_file_logger/winston/logger"));
exports.default = async () => {
    const serverHost = _index_1.default.app.host;
    const serverPort = _index_1.default.app.port;
    const serverSsl = _index_1.default.app.host;
    let serverConnections;
    serverConnections = [];
    const server = await createServer((0, app_1.default)(), serverSsl);
    server.listen(serverPort);
    server.on('listening', () => onListening(serverHost, serverPort));
    server.on('error', (error) => onError(error, serverHost, serverPort, server, serverConnections));
    server.on('connection', (connection) => {
        serverConnections.push(connection);
        connection.on('close', () => {
            serverConnections = serverConnections.filter((curr) => curr !== connection);
        });
    });
    if (_index_1.default.debug.http_connection)
        getConnections(server);
    process.on('SIGTERM', () => shutDown(server, serverConnections));
    process.on('SIGINT', () => shutDown(server, serverConnections));
    return server;
};
const createServer = (app, serverSsl) => {
    let httpserver;
    if (_index_1.default.app.ssl) {
        httpserver = https_1.default.createServer(serverSsl, app);
    }
    else {
        httpserver = http_1.default.createServer(app);
    }
    return httpserver;
};
const onListening = (host, port) => {
    /* eslint-disable no-console */
    console.log(ansi_colors_1.default.white(`-> Listening on ${host}:${port}`));
    logger_1.default.info(`Api status: Ready (listening on ${host}:${port})`);
};
const onError = (error, host, port, server, connections) => {
    if (error.syscall !== 'listen')
        throw error;
    switch (error.code) {
        case 'EACCES':
            /* eslint-disable no-console */
            console.log(`Http server error - Host ${host}:${port} requires elevated privileges (${error.code})`);
            /* eslint-enable no-console */
            logger_1.default.error(`Http server error - Host ${host}:${port} requires elevated privileges (${error.code})`);
            shutDown(server, connections);
            break;
        case 'EADDRINUSE':
            /* eslint-disable no-console */
            console.log(`Http server error - Host ${host}:${port} is already in use (${error.code})`);
            /* eslint-enable no-console */
            logger_1.default.error(`Http server error - Host ${host}:${port} is already in use (${error.code})`);
            shutDown(server, connections);
            break;
        case 'EADDRNOTAVAIL':
            /* eslint-disable no-console */
            console.log(`Http server error - Host ${host}:${port} not available (${error.code})`);
            /* eslint-enable no-console */
            logger_1.default.error(`Http server error - Host ${host}:${port} not available (${error.code})`);
            shutDown(server, connections);
            break;
        default:
            logger_1.default.error(`Http server error - Host ${host}:${port} not available (${error})`);
            throw error;
    }
};
const shutDown = (server, connections) => {
    /* eslint-disable no-console */
    console.log('Http server error - Received kill signal, shutting down gracefully (SHUTDOWN)');
    /* eslint-enable no-console */
    logger_1.default.error('Http server error - Received kill signal, shutting down gracefully (SHUTDOWN)');
    server.close(() => {
        /* eslint-disable no-console */
        console.log('Http server error - Closed out remaining connections (SHUTDOWN)');
        /* eslint-enable no-console */
        logger_1.default.error('Http server error - Closed out remaining connections (SHUTDOWN)');
        process.exit(0);
    });
    setTimeout(() => {
        /* eslint-disable no-console */
        console.log('Http server error - Could not close connections in time, forcefully shutting down (SHUTDOWN)');
        /* eslint-enable no-console */
        logger_1.default.error('Http server error - Could not close connections in time, forcefully shutting down (SHUTDOWN)');
        process.exit(1);
    }, 10000);
    connections.forEach((curr) => curr.end());
    setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
};
const getConnections = (server) => {
    setInterval(() => server.getConnections((err, count) => {
        if (err)
            logger_1.default.error(`Http server connections logs error. ${err}`);
        if (!err)
            /* eslint-disable no-console */
            console.log(`${count} connections currently open`);
        /* eslint-enable no-console */
    }), 1000);
};
