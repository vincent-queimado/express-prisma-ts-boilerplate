
import config from '@config/app';
import bcrypt from 'bcrypt';
import { prisma } from '@database/db_connection';
import { Prisma } from '@prisma/client';
import logger from '@utils/logger/winston/logger';



export class UsersService {
  constructor(private model = prisma.user) { }


  async create(data: { email: string; name: string; password: string; }) {
    const hashedPassword = await bcrypt.hash(data.password, config.bcrypt.saltRounds);

    return this.model.create({
      data: { ...data, password: hashedPassword }
    });
  }

  async findAll(take: number = 10, skip: number = 0, filter: Prisma.UserWhereInput = {}, select: Prisma.UserSelect = {}) {
    logger.info("findAll service");
    return this.model.findMany({ take, skip, where: filter, select });
  }
}
