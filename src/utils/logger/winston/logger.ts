import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import logsPath from 'app-root-path';

import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

export const setLogContext = (context: { [key: string]: any; requestId: string }) => {
  const store = new Map<string, any>();
  store.set('context', context);
  asyncLocalStorage.enterWith(store);
};

export const updateLogContext = (newContext: any = {}) => {
  const store = asyncLocalStorage.getStore();
  if (store) {
    const currentContext = store.get('context') || {};
    store.set('context', { ...currentContext, ...newContext });
  }
};

export const getLogContext = () => {
  const store = asyncLocalStorage.getStore();
  return store ? store.get('context') : {};
};


const customLogFormat = winston.format.combine(
  winston.format.json(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    const context = getLogContext();
    const requestId = context.requestId || 'RequestId: MISSING'; // Fallback if requestId is somehow missing
    const { requestId: _, ...restContext } = context;
    const contextDisplay =
      Object.keys(restContext).length > 0 ? `Ref: ${JSON.stringify(restContext)}` : 'Ref: UNKNOWN';
    return `${info.timestamp} | ${info.level.toUpperCase()} | ${contextDisplay} | RequestId: ${requestId} | ${info.message}`;
  }),
);
const path = logsPath.resolve('/logs/');
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      frequency: '24h',
      level: 'error',
      dirname: `${path}/`,
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      handleExceptions: true,
      zippedArchive: false,
      maxSize: '5m',
      maxFiles: '7d',
      format: customLogFormat,
    }),
    new DailyRotateFile({
      frequency: '24h',
      level: 'info',
      dirname: `${path}/`,
      filename: 'info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '5m',
      maxFiles: '7d',
      format: customLogFormat,
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), customLogFormat),
      level: 'error',
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

export default logger;
