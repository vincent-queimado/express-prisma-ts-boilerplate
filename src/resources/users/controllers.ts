import http_msg from "@utils/http_messages/http_msg";
import logger, { updateLogContext } from "@utils/logger/winston/logger";
import { Request, Response, Router } from "express";
import { JwtService, UsersService } from "./services";

export class UsersControllers {
  constructor(
    public router = Router(),
    private service = new UsersService(),
    private jwtService = new JwtService()
  ) {
    this.defineRoutes();
  }

  defineRoutes() {
    this.router.post("/users", this.createUser);
    this.router.get("/users", this.fetchAll);
    this.router.get("/users/auth/me", this.authMe);
  }
  private fetchAll = async (_req: Request, res: Response) => {
    try {
      logger.info(`fetchAll users controller`);
      updateLogContext({
        user: { name: "public user api ", ip: _req.connection.remoteAddress },
      });
      const users = await this.service.findAll(
        1000,
        0,
        { isDisabled: false },
        { name: true, email: true, id: true }
      );
      res.status(200).json(http_msg.http200(users));
    } catch (error) {
      logger.error(`fetch all users route error: ${error}`);
    }
  };

  private authMe = async (_req: Request, res: Response) => {
    try {
      const authHeader = _req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json(http_msg.http422("Unauthorized", "No token provided"));
      }
      const token = authHeader.split(" ")[1];
      const user = await this.service.authme(token);
      res.status(200).json(http_msg.http200({ status: "ok", user }));
    } catch (error) {
      res.status(500).json(http_msg.http422("Internal Server Error", error));
    }
  };

  private createUser = async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body as any;

      logger.info(`User ${email} : ${name} : ${password}`);

      if (!email || !name || !password) {
        logger.warn("Missing required fields in createUser");
        return res
          .status(400)
          .json(http_msg.http401("Email, name, and password are required"));
      }

      const user = await this.service.create({ email, name, password });
      const { password: _, ...userWithoutPassword } = user;
      const tokens = this.jwtService.generateTokens({
        email: user.email,
        id: user.id,
      });
      res
        .status(201)
        .json(http_msg.http201({ ...userWithoutPassword, tokens }));
    } catch (error) {
      logger.error(`createUser route error: ${error}`);
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint")
      ) {
        return res
          .status(409)
          .json(http_msg.http401("Email or password already exists"));
      }
      res.status(500).json(http_msg.http422("Internal Server Error", error));
    }
  };
}
