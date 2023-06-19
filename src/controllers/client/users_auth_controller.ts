import { Request, Response, NextFunction } from 'express';
import presenter from '@services/client/user_auth';
import logger from '@utils/logger/winston/logger';

const login = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .login(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Login error. ${err.message}`);
            next(err);
        });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .logout()
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Logout error. ${err.message}`);
            next(err);
        });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .register(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Register error. ${err.message}`);
            next(err);
        });
};

const registerConfirm = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .registerConfirm(req.query)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => /* istanbul ignore next*/ {
            logger.error(`Register confirmation error. ${err.message}`);
            next(err);
        });
};

const forgotPasswordRequest = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .forgotPasswordRequest(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Password reset request error. ${err.message}`);
            next(err);
        });
};

const forgotPasswordReset = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .forgotPasswordReset(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Password reset error. ${err.message}`);
            next(err);
        });
};

export default {
    login,
    logout,
    register,
    registerConfirm,
    forgotPasswordRequest,
    forgotPasswordReset,
};
