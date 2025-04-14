import { IEnvConfig, IProcessEnv } from './types';

const devConfig = (env: IProcessEnv): IEnvConfig => {
  return {
    database: {
      url:
        env.DATABASE_URL ||
        'sqlite:///./sqlite3.db',
    },
    type: "sqlite"
  };
};

const stageConfig = (env: IProcessEnv): IEnvConfig => {
  return {
    database: {
      url:
        env.DATABASE_URL ||
        'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
    },
    type: "postgresql"

  };
};

const prodConfig = (env: IProcessEnv): IEnvConfig => {
  return {
    database: {
      url:
        env.DATABASE_URL ||
        'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
    },

    type: "postgresql"
  };
};

export default { devConfig, stageConfig, prodConfig };
