import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import config from '@config/app';
import logger from '@utils/logger/winston/logger';
import servFindOneUser from '@dao/users/user_get_one_dao';
import servCheckPassword from '@functions/check_password';

const errorMsg = 'Invalid token';

const localUserOpts = {
    usernameField: 'email',
    passwordField: 'password',
};

const jwtUserOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secretUser,
};

const jwtUserStrategy = async (passport: any) => {
    passport.use(
        'jwt-user',
        new JWTStrategy(jwtUserOpts, async (payload, done) => {
            try {
                const newUser = await getUser({
                    id: payload.id,
                    isDeleted: false,
                    isRegistered: true,
                });
                if (!newUser.success) done(errorMsg, {});

                newUser.data ? done(null, newUser.data) : done(null, {});
            } catch (err) {
                logger.error(`JWT passport strategy error: ${err})`);
                return done(err, {});
            }
        }),
    );
};

const localUserStrategy = async (passport: any) => {
    passport.use(
        'login-user',
        new LocalStrategy(localUserOpts, async (email, password, done) => {
            try {
                // Check user
                const newUser = await getUser({
                    email,
                    isDeleted: false,
                    isRegistered: true,
                });

                if (!newUser.success) return done(errorMsg, {});
                if (!newUser.data) return done(null, {});

                // Check password
                const checkedPassword = await checkPassword(password, newUser.data.password);
                if (!checkedPassword) return done(null, {});

                delete newUser.data.password;

                if (newUser.data) return done(null, newUser.data);

                return done(errorMsg, {});
            } catch (err) {
                logger.error(`JWT passport strategy error: ${err})`);
                return done(err, {});
            }
        }),
    );
};

const getUser = async (where: object) => {
    const select = {
        id: true,
        name: true,
        email: true,
        avatar: true,
        password: true,
    };

    // Get user by email
    const result = await servFindOneUser(where, select);
    if (!result.success) return { success: false, data: null };

    return { success: true, data: result.data, error: null };
};

const checkPassword = async (plainPassword: string, hashPassword: string) => {
    const result = await servCheckPassword(plainPassword, hashPassword);

    if (!result.success) return false;

    return true;
};

export { localUserStrategy, jwtUserStrategy };
