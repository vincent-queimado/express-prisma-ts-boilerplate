const ERROR_CODE = {
    register: 'ERROR_USER_REGISTER',
    registerConfirm: 'ERROR_USER_SIGNUP_CONFIRMATION',
    login: 'ERROR_USER_LOGIN',
    requestPassword: 'ERROR_USER_REQUEST_PASSWORD',
    resetPassword: 'ERROR_USER_RESET_PASSWORD',
};

const REGISTER_ERROR_MSG = {
    failToRegister: 'Failed to register user',
    failToDeleted: 'Failed to register a deleted user',
    failToDisabled: 'Failed to register a disabled user',
    AlreadyRegistered: 'Failed to register an already registered user',
};

const REGISTER_CONFIRM_MSG = {
    failToConfirm: 'Failed to confirm registration',
};

const LOGIN_MSG = {
    failToLogin: 'Failed to authenticate',
};

const REQUEST_PASSWORD_MSG = {
    failToRequest: 'Failed to request password',
};

const RESET_PASSWORD_MSG = {
    failToRequest: 'Failed to reset password',
};

export default {
    ERROR_CODE,
    REGISTER_ERROR_MSG,
    REGISTER_CONFIRM_MSG,
    LOGIN_MSG,
    REQUEST_PASSWORD_MSG,
    RESET_PASSWORD_MSG,
};
