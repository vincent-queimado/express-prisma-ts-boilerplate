import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { setLogContext } from '@utils/logger/winston/logger';

export const logContextMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  const requestId = uuidv4() + "-_-" + _req.connection.remoteAddress;
  setLogContext({ requestId });
  next();
};
