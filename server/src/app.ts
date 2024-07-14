import express, { Express } from 'express';
import { ServerApp } from '@root/setup_server';
import connectDB from '@root/setup_db';
import { config } from '@root/config';

class Application {
  public initialize(): void {
    this.loadConfig();
    connectDB();
    const app: Express = express();
    const server: ServerApp = new ServerApp(app);
    server.start();
  }
  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
