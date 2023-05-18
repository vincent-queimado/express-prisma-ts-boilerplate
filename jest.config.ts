import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    modulePaths: ['<rootDir>'],
    testMatch: ['**/tests/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    coveragePathIgnorePatterns: [
        'node_modules',
        'prisma',
        'public',
        'logs',
        'tests',
        'src/config',
        'src/app.ts',
        'src/server',
        'controllers/',
        'presenters/',
        'services/',
        'utils/http_messages',
        'utils/nodemailer/',
    ],
    coverageThreshold: {
        global: {
            lines: 50,
        },
    },
    coverageReporters: ['json-summary', 'text', 'lcov', 'clover', 'html'],
    transform: {},
};
