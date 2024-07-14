import { authRoutes } from '@auth/routes/authRoutes';
import { authMiddleware } from '@global/middlewares/auth_middleware';
import { serverAdapter } from '@service/queues/base.queue';
import { Application } from 'express';

const BASE_PATH = '/api/v1';

const AllAppRoutes = (app: Application) => {
  const routes = () => {
    app.use('/queue', serverAdapter.getRouter());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authRoutes.signoutRoute());

  };
  routes();
};

export { AllAppRoutes };
