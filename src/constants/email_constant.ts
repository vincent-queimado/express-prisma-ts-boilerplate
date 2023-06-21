import globalUrl from '@utils/global_http_url/global_http_url';

const IS_NOTIFICATE = {
    welcome: true,
    emailVerify: true,
    passwordRequest: false,
    passwordReset: false,
};

const TEMPLATE_PATH = {
    client: 'src/views/templates/email/client',
    admin: 'src/views/templates/email/admin',
};

const TEMPLATE_FILE = {
    welcome: 'user_welcome.ejs',
    emailVerify: 'user_email_verify.ejs',
    passwordRequest: 'user_password_request',
    passwordReset: 'user_password_reseted',
};

const TEMPLATE_SUBJECT = {
    welcome: 'Welcome',
    emailVerify: 'Registration confirmation',
    passwordRequest: 'Password recovery request',
    passwordReset: 'Password reset confirmation',
};

const WELCOME_REDIRECT = `${globalUrl()}/welcome.html`;
const REGISTRATION_REDIRECT = `${globalUrl()}/api/v1/auth/register/confirmation`;

export default {
    IS_NOTIFICATE,
    TEMPLATE_PATH,
    TEMPLATE_FILE,
    TEMPLATE_SUBJECT,
    WELCOME_REDIRECT,
    REGISTRATION_REDIRECT,
};
