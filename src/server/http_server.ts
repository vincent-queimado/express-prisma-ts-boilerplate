import fs from 'fs';
import http from 'http';
import https from 'https';
import colorTxt from 'ansi-colors';

import app from '@server/app';
import config from '@config/app';
import logger from '@utils/logger/winston/logger';

export default async (silent: boolean) => {
    const serverHost = config.app.host;
    const serverPort = config.app.port;

    let serverConnections: any;
    serverConnections = [];

    const server = createServer(app());

    server.listen(serverPort);

    server.on('listening', () => onListening(serverHost, serverPort, silent));

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

const createServer = (app: any) => {
    let httpserver;
    let options;

    if (config.ssl.isHttps && config.isProd) {
        try {
            options = {
                key: fs.readFileSync(`${config.ssl.privateKey}`),
                cert: fs.readFileSync(`${config.ssl.certificate}`),
            };
        } catch (err) {
            logger.error(`Http server error - SSL certificate files is not found`);
            logger.error(`Http server error - Shutting down gracefully (SHUTDOWN)`);
            process.exit(0);
        }
        httpserver = https.createServer(options, app);
    } else {
        httpserver = http.createServer(app);
    }

    return httpserver;
};

const onListening = (host: string, port: number, silent: boolean) => {
    if (!silent) {
        /* eslint-disable no-console */
        if (config.ssl.isHttps && config.isProd) {
            console.log(
                colorTxt.white(`-> Listening on https://${host}:${port} (SSL)`),
                /* eslint-enable no-console */
            );
        } else {
            console.log(
                colorTxt.white(`-> Listening on http://${host}:${port}`),
                /* eslint-enable no-console */
            );
        }
    }

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
