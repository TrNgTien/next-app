import { Endpoints } from '@/constants';
import { authServiceInstance } from '@/services';
import { Express } from 'express';

export default (app: Express) => {
  app.use(`${Endpoints.SIGN_IN}`, authServiceInstance.signIn);
  app.use(`${Endpoints.SIGN_UP}`, authServiceInstance.signUp);
};
