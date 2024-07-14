import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import http from 'http';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import Logger from 'bunyan';
import apiStats from 'swagger-stats';
import 'express-async-errors';
import { config } from '@root/config';
import { AllAppRoutes } from '@root/routes';
import { CustomError, IErrorRes } from '@global/helpers/error_handler';
// import { CustomError, IErrorRes } from "./shared/globals/helpers/error_handler";
// import { config } from "./config";
// import appRoutes from "./routes"
const server_port = 5000;
const log: Logger = config.createLogger('server');

export class ServerApp {
  private app: Application;
  private readonly methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.appMonitoring(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }
  private securityMiddleware(app: Application): void {
    // app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development',
        sameSite: 'none'
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
      })
    );
  }
  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private routesMiddleware(app: Application): void {
    AllAppRoutes(app);
  }
  private appMonitoring(app: Application): void {}
  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${req.originalUrl} Not Found`, statusCode: HTTP_STATUS.NOT_FOUND, status: 'error' });
    });
    app.use((error: IErrorRes, _req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      log.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
  }
  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);
      this.startHttpServer(httpServer);
      this.socketIoConnections(socketIO);
    } catch (error) {
      log.error(error);
    }
  }
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: this.methods
      }
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    return io;
  }
  private startHttpServer(httpServer: http.Server): void {
    log.info(`Worker with process id of${process.pid} has started...`);
    log.info(`Server has started with process ${process.pid}`);

    httpServer.listen(server_port, () => {
      console.log(`Server is successfully running on port: ${server_port} `);
      log.info(`Server is successfully running on port: ${server_port} `);
    });
  }
  private socketIoConnections(io: Server): void {
    log.info(`socketIoConnections `);
  }
}
