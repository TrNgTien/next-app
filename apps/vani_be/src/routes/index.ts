import { Endpoints } from '@/common';
import { Express } from 'express';
import authRoute from './auth.route';
import questionRoute from './question.route';

export default (app: Express) => {
  app.use(`/v1/api/${Endpoints.AUTH}`, authRoute);
  app.use(`/v1/api/${Endpoints.QUESTIONS}`, questionRoute);
};
