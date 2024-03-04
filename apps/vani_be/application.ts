import { environment } from "@/helpers";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import MainRoutes from "./src/routes";

const mainApplication = async () => {
  const app: Express = express();
  const PORT = environment.get("APP_ENV_PORT") || 8080;

  //-----------------------------------------------
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

  //-----------------------------------------------
  app.get("/up", (_req: Request, res: Response) => {
    const healthcheck = {
      uptime: `${(process.uptime() / 60).toLocaleString()}m`,
      message: "OK",
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
