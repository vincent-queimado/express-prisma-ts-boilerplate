import presenter from '../presenters/users_auth/_index';
import logger from '../../utils/winston_file_logger/winston/logger';

const signin = (req: any, res: any, next: any) => {
    presenter
        .signin(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de signup. ${err.message}`);
            next(err);
        });
};

const signout = (req: any, res: any, next: any) => {
    presenter
        .signout(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de signout. ${err.message}`);
            next(err);
        });
};

const signup = (req: any, res: any, next: any) => {
    presenter
        .signup(req.body)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de sigup. ${err.message}`);
            next(err);
        });
};

const signupConfirm = (req: any, res: any, next: any) => {
    presenter
        .signupConfirm(req.query)
        .then((result: any) => res.status(result.httpStatusCode).json(result.data))
        .catch((err: any) => {
            logger.error(`Erro de confirmação de signup. ${err.message}`);
            next(err);
        });
};

// const forgotPasswordRequest = (req: any, res: any, next: any) => {
//     presenter
//         .forgotPasswordRequest(req.body)
//         .then((result: any) => res.status(result.httpStatusCode).json(result.data))
//         .catch((err: any) => {
//             logger.error(`Erro de solicitação de reset de senha. ${err.message}`);
//             next(err);
//         });
// };

// const forgotPasswordReset = (req: any, res: any, next: any) => {
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
