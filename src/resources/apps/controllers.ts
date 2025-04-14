
import config from '@config/database';
import { prisma } from '@database/db_connection';
import { PrismaClient } from '@prisma/client';
import http_msg from '@utils/http_messages/http_msg';
import logger from '@utils/logger/winston/logger';
import { Request, Response, Router } from 'express';

export class AppControllers {
  constructor(public router = Router(), private prismaClient: PrismaClient = prisma) {
    this.defineRoutes();
  }

  defineRoutes() {
    this.router.get('/health-check', this.healthCheck);
  }
  private healthCheck = async (_req: Request, res: Response) => {
    try {
      logger.info(`health-check controller`);
      let query = '';
      const dbType = config.type;
      switch (dbType) {
        case 'postgresql':
          query = `
          SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
        `;
          break;

        case 'mysql':
          query = `
          SELECT table_name FROM information_schema.tables
          WHERE table_schema = DATABASE();
        `;
          break;

        case 'sqlite':
          query = `
          SELECT name as table_name FROM sqlite_master
          WHERE type='table' AND name NOT LIKE 'sqlite_%';
        `;
          break;

        default:
          throw new Error(`Unsupported DB type: ${dbType}`);
      }

      const result: any = await this.prismaClient.$queryRawUnsafe(query);
      const data = result.map((row: any) => row.table_name);

      res.json(http_msg.http200({ db: data }))
    } catch (error) {
      logger.error(`fetch all users route error: ${error}`)
    }
  }
}
