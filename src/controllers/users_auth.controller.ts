import { Request, Response, NextFunction } from 'express';
import presenter from '@presenters/users_auth/_index';
import logger from '@utils/winston_file_logger/winston/logger';

const signin = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .signin(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de signup. ${err.message}`);
            next(err);
        });
};

const signout = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .signout(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de signout. ${err.message}`);
            next(err);
        });
};

const signup = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .signup(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de sigup. ${err.message}`);
            next(err);
        });
};

const signupConfirm = (req: Request, res: Response, next: NextFunction) => {
    presenter
        .signupConfirm(req.query)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de confirmação de signup. ${err.message}`);
            next(err);
        });
};

// const forgotPasswordRequest = (req: Request, res: Response, next: NextFunction) => {
//     presenter
//         .forgotPasswordRequest(req.body)
//         .then((result: any) => res.status(result.httpStatusCode).json(result.data))
//         .catch((err: any) => {
//             logger.error(`Erro de solicitação de reset de senha. ${err.message}`);
//             next(err);
//         });
// };

// const forgotPasswordReset = (req: Request, res: Response, next: NextFunction) => {
//     presenter
//         .forgotPasswordReset(req.body)
//         .then((result: any) => res.status(result.httpStatusCode).json(result.data))
//         .catch((err: any) => {
//             logger.error(`Erro de reset de senha. ${err.message}`);
//             next(err);
//         });
// };

export default {
    signin,
    signout,
    signup,
    signupConfirm,
    // forgotPasswordRequest,
    // forgotPasswordReset,
};
