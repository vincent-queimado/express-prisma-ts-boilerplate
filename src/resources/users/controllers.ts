import bcrypt from 'bcrypt';
import { prisma } from '@database/db_connection';
import http_msg from '@utils/http_messages/http_msg';
import logger from '@utils/logger/winston/logger';
import { Request, Response, Router } from 'express';
import config from '@config/app';

export class UsersControllers {
  constructor(public router = Router(), private model = prisma.user) {
    this.defineRoutes();
  }

  defineRoutes() {
    this.router.post('/users/create', this.createUser);
    this.router.get('/users', this.fetchAll);
  }

  private fetchAll = async (_req: Request, res: Response) => {
    try {
      logger.info(`fetchAll users controller`);
      const users = await this.model.findMany({
        where: { isDisabled: false },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          isDisabled: true,
        },
      });
      res.json(http_msg.http200(users))
    } catch (error) {
      logger.error(`fetch all users route error: ${error}`)
    }
  }

  private createUser = async (req: Request, res: Response) => {
    try {
      logger.info(`createUser controller`);

      const { email, name, password } = req.body as any;

      logger.info(`User ${email} : ${name} : ${password}`);
      // Basic validation
      if (!email || !name || !password) {
        logger.warn('Missing required fields in createUser');
        return res.status(400).json(http_msg.http401('Email, name, and password are required'));
      }

      const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);

      const user = await this.model.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      // Remove password from response for security
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(http_msg.http201(userWithoutPassword));
    } catch (error) {
      logger.error(`createUser route error: ${error}`);
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        return res.status(409).json(http_msg.http401('Email or password already exists'));
      }
      res.status(500).json(http_msg.http422("Internal Server Error", error));
    }
  };


}
