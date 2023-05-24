import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
    },
    testTimeout: 60000,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ['<rootDir>'],
    testMatch: ['**/__test__/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    coveragePathIgnorePatterns: [
        'node_modules',
        'prisma',
        'public',
        'logs',
        '__test__',
        'src/config',
        'src/app.ts',
        'src/server',
        'middlewares/http_error_handler',
        'src/middlewares/rate_limiter',
        'presenters/users/delete_me_presenter.ts',
        'presenters/users_auth/forgot_password_request_presenter.ts',
        'presenters/users_auth/forgot_password_reset_presenter.ts',
        'services/users/logical_delete_user_service.ts',
        'utils/http_messages',
        'utils/nodemailer/',
    ],
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
    coverageReporters: ['json-summary', 'text', 'lcov', 'clover', 'html'],
    transform: {},
};
