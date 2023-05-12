export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string | null;
    accountName: string | null;
    accountLocationState: string | null;
    accountType: string;
    google_signin: boolean;
    google_given_name: string | null;
    google_family_name: string | null;
    google_locale: string | null;
    google_avatar: string | null;
    password: string;
    signupConfirmationComplete: boolean;
    signupConfirmationToken: string;
    resetPasswordToken: string;
    enabled: boolean;
    deleted: boolean;
}
