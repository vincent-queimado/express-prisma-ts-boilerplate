import { Response } from 'express';

const errorHandler = (err: any, res: Response) => {
    if (err.error === 'ValidationError') {
        return res.status(400).json({
            error: {
                code: 400,
                error: 'VALIDATION_ERROR',
                message: err.message,
            },
        });
    }

    if (err.error === 'UnauthorizedError') {
        return res.status(401).json({
            error: {
                code: 401,
                error: 'JWT_AUTHENTICATION_ERROR',
                message: 'Unauthorized. Access denied!',
            },
        });
    }

    if (err.error === 'JsonWebTokenError') {
        return res.status(401).json({
            error: {
                code: 401,
                error: 'JWT_AUTHENTICATION_ERROR',
                message: 'Jwt token error. Access denied!',
            },
        });
    }

    if (err.error === 'TokenExpiredError') {
        return res.status(401).json({
            error: {
                code: 401,
                error: 'JWT_AUTHENTICATION_ERROR',
                message: 'Jwt token expired. Access denied!',
            },
        });
    }

    if (err.error === 'NotFound') {
        return res.status(404).json({
            error: {
                code: 404,
                error: 'NOT_FOUND',
                message: 'The requested resource could not be found.',
            },
        });
    }

    if (err.error === 'Unprocessable') {
        return res.status(422).json({
            error: {
                code: 422,
                error: 'UNPROCESSABLE_ENTITY',
                message:
                    'Unprocessable Entity error occurs when a request to the API can not be processed.',
            },
        });
    }

    // default to 500 server error
    return res.status(500).json({
        error: {
            code: 500,
            error: 'SERVER_ERROR',
            message: 'Internal Server Error',
        },
    });
};

export default errorHandler;
