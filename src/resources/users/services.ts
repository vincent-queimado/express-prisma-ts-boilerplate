import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@config/app";
import bcrypt from "bcrypt";
import { prisma } from "@database/db_connection";
import { Prisma } from "@prisma/client";
import logger from "@utils/logger/winston/logger";

export class JwtService {
  private readonly secret: string = config.jwt.secretUser;
  private readonly accessTokenExpiresIn: string = "15m";
  private readonly refreshTokenExpiresIn: string = "2d";
  private readonly tokenType: string = "Bearer";

  static isJwtPayload(value: JwtPayload | string): value is JwtPayload {
    return (value as JwtPayload).sub !== undefined;
  }

  generateTokens(user: { email: string; id: string }) {
    const payload = {
      sub: user.id, // Subject (unique user identifier)
      email: user.email,
      tokenType: this.tokenType,
      iat: Math.floor(Date.now() / 1000), // Issued at (in seconds)
    };

    const accessToken = jwt.sign(payload, this.secret, {
      expiresIn: this.accessTokenExpiresIn,
    });

    const refreshToken = jwt.sign(
      { ...payload, scope: "refresh" },
      this.secret,
      {
        expiresIn: this.refreshTokenExpiresIn,
      }
    );

    logger.info("Tokens generated for userId:", user.id);
    return { accessToken, refreshToken, tokenType: this.tokenType };
  }

  verifyAccessToken(token: string): JwtPayload | string {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      if (decoded.tokenType !== this.tokenType) {
        throw new Error("Invalid token type");
      }
      logger.info("Access token verified for userId:", decoded.sub);
      return decoded;
    } catch (error) {
      logger.error("Invalid access token:", error);
      throw new Error("Invalid access token");
    }
  }

  refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, this.secret) as JwtPayload & {
        scope?: string;
      };
      if (!decoded.scope || decoded.scope !== "refresh") {
        throw new Error("Invalid refresh token scope");
      }

      const payload = {
        sub: decoded.sub,
        email: decoded.email,
        tokenType: this.tokenType,
        iat: Math.floor(Date.now() / 1000),
      };

      const accessToken = jwt.sign(payload, this.secret, {
        expiresIn: this.accessTokenExpiresIn,
      });

      logger.info("Access token refreshed for userId:", decoded.sub);
      return { accessToken, tokenType: this.tokenType };
    } catch (error) {
      logger.error("Invalid refresh token:", error);
      throw new Error("Invalid refresh token");
    }
  }
}

export class UsersService {
  constructor(private model = prisma.user) {}

  async authme(token: string, jwtService: JwtService = new JwtService()) {
    const user = jwtService.verifyAccessToken(token);
    if (!user || !user.sub || !JwtService.isJwtPayload(user)) {
      throw new Error(`Invalid token`);
    }
    return this.findOne(user.sub);
  }

  async login(
    data: { email: string; password: string },
    jwtService: JwtService = new JwtService()
  ) {
    const user = await this.model.findUnique({
      where: { email: data.email },
    });

    if (!user || user.isDisabled || user.isDeleted) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const tokens = jwtService.generateTokens({
      id: user.id,
      email: user.email,
    });
    return tokens;
  }

  async create(data: { email: string; name: string; password: string }) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      config.bcrypt.saltRounds
    );

    return this.model.create({
      data: { ...data, password: hashedPassword },
    });
  }
  async findOne(userId: string) {
    return this.model.findFirstOrThrow({
      where: { id: userId },
    });
  }

  async findAll(
    take = 10,
    skip = 0,
    filter: Prisma.UserWhereInput = {},
    select: Prisma.UserSelect = {}
  ) {
    logger.info("findAll service");
    return this.model.findMany({ take, skip, where: filter, select });
  }
}
