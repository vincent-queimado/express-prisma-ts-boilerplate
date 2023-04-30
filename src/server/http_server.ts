import http from 'http';
import https from 'https';
import colorTxt from 'ansi-colors';

import app from '@server/app_express';
import config from '@config/app/_index';
import logger from '@utils/winston_file_logger/winston/logger';

export default async () => {
    const serverHost = config.app.host;
    const serverPort = config.app.port;
    const serverSsl = config.app.host;

    let serverConnections: any;
    serverConnections = [];

    const server = createServer(app(), serverSsl);

    server.listen(serverPort);

    server.on('listening', () => onListening(serverHost, serverPort));

    server.on('error', (error) =>
        onError(error, serverHost, serverPort, server, serverConnections),
    );

    server.on('connection', (connection: any) => {
        serverConnections.push(connection);

        connection.on('close', () => {
            serverConnections = serverConnections.filter((curr: any) => curr !== connection);
        });
    });

    if (config.debug.http_connection) getConnections(server);

    process.on('SIGTERM', () => shutDown(server, serverConnections));
    process.on('SIGINT', () => shutDown(server, serverConnections));

    return server;
};

const createServer = (app: any, serverSsl: any) => {
    let httpserver;

    if (config.app.ssl) {
        httpserver = https.createServer(serverSsl, app);
    } else {
        httpserver = http.createServer(app);
    }
    return httpserver;
};

const onListening = (host: string, port: number) => {
    /* eslint-disable no-console */
    console.log(
        colorTxt.white(`-> Listening on server: ${host}:${port}`),
        /* eslint-enable no-console */
    );
    logger.info(`Api status: Ready (listening on ${host}:${port})`);
};

const onError = (
    error: any,
    host: string,
    port: number,
    server: unknown,
    connections: Array<string>,
) => {
    if (error.syscall !== 'listen') throw error;
    switch (error.code) {
        case 'EACCES':
            /* eslint-disable no-console */
            console.log(
                `Http server error - Host ${host}:${port} requires elevated privileges (${error.code})`,
            );
            /* eslint-enable no-console */
            logger.error(
                `Http server error - Host ${host}:${port} requires elevated privileges (${error.code})`,
            );
            shutDown(server, connections);
            break;
        case 'EADDRINUSE':
            /* eslint-disable no-console */
            console.log(
                `Http server error - Host ${host}:${port} is already in use (${error.code})`,
            );
            /* eslint-enable no-console */
            logger.error(
                `Http server error - Host ${host}:${port} is already in use (${error.code})`,
            );
            shutDown(server, connections);
            break;
        case 'EADDRNOTAVAIL':
            /* eslint-disable no-console */
            console.log(`Http server error - Host ${host}:${port} not available (${error.code})`);
            /* eslint-enable no-console */
            logger.error(`Http server error - Host ${host}:${port} not available (${error.code})`);
            shutDown(server, connections);
            break;
        default:
            logger.error(`Http server error - Host ${host}:${port} not available (${error})`);
            throw error;
    }
};
const shutDown = (server: any, connections: any) => {
    /* eslint-disable no-console */
    console.log('Http server error - Received kill signal, shutting down gracefully (SHUTDOWN)');
    /* eslint-enable no-console */
    logger.error('Http server error - Received kill signal, shutting down gracefully (SHUTDOWN)');
    server.close(() => {
        /* eslint-disable no-console */
        console.log('Http server error - Closed out remaining connections (SHUTDOWN)');
        /* eslint-enable no-console */
        logger.error('Http server error - Closed out remaining connections (SHUTDOWN)');
        process.exit(0);
    });
    setTimeout(() => {
        /* eslint-disable no-console */
        console.log(
            'Http server error - Could not close connections in time, forcefully shutting down (SHUTDOWN)',
        );
        /* eslint-enable no-console */
        logger.error(
            'Http server error - Could not close connections in time, forcefully shutting down (SHUTDOWN)',
        );
        process.exit(1);
    }, 10000);
    connections.forEach((curr: any) => curr.end());
    setTimeout(() => connections.forEach((curr: any) => curr.destroy()), 5000);
};

const getConnections = (server: any) => {
    setInterval(
        () =>
            server.getConnections((err: any, count: any) => {
                if (err) logger.error(`Http server connections logs error. ${err}`);
                if (!err)
                    /* eslint-disable no-console */
                    console.log(`${count} connections currently open`);
                /* eslint-enable no-console */
            }),
        1000,
    );
};
