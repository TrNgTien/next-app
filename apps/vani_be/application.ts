import { keys } from '@/config';
import { environment } from '@/helpers';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import passport from 'passport';
import MainRoutes from './src/routes';
var bodyParser = require('body-parser');

const mainApplication = async () => {
  const app: Express = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const PORT = environment.get('APP_ENV_PORT') || 8080;

  //-------------questionServiceInstance.answerQuestion----------------------------------
  app.use(cors());

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  //-----------------------------------------------
  app.get('/up', (_req: Request, res: Response) => {
    const healthcheck = {
      uptime: `${(process.uptime() / 60).toLocaleString()}m`,
      message: 'OK',
    };
    try {
      res.send(healthcheck);
    } catch (error) {
      healthcheck.message = error;
      res.status(503).send();
    }
  });

  //-----------------------------------------------
  MainRoutes(app);

  //-----------------------------------------------
  app.listen(PORT, () => {
    console.log(`⚡️[VIS]: Server is running at http://localhost:${PORT}`);
  });
};

//-----------------------------------------------
mainApplication();
