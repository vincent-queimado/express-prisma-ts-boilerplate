import { IEnvConfig, IProcessEnv } from './types';

const devConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            url:
                env.DATABASE_URL ||
                'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
        },
    };
};

const stageConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            url:
                env.DATABASE_URL ||
                'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
        },
    };
};

const prodConfig = (env: IProcessEnv): IEnvConfig => {
    return {
        database: {
            url:
                env.DATABASE_URL ||
                'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
        },
    };
};

export default { devConfig, stageConfig, prodConfig };
