import 'winston-daily-rotate-file';
import winston from 'winston';
import logsPath from 'app-root-path';

const path = logsPath.resolve('/logs/');

const custom = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`,
    ),
);

const customInfo = winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
        (info) => `${info.timestamp} | ${info.level.toUpperCase()} | ${info.message}`,
    ),
);

const logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            frequency: '24h',
            name: 'error',
            level: 'error',
            dirname: `${path}/`,
            filename: 'error-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            handleExceptions: true,
            prepend: true,
            zippedArchive: false,
            maxSize: '5m',
            maxFiles: '7d',
            format: custom,
        }),
        new winston.transports.DailyRotateFile({
            frequency: '24h',
            name: 'info',
            level: 'info',
            dirname: `${path}/`,
            filename: 'info-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            prepend: true,
            zippedArchive: false,
            maxSize: '5m',
            maxFiles: '7d',
            format: customInfo,
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), custom),
            level: 'error',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

export default logger;
