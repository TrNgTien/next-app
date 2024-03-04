import { Endpoints } from "@/common";
import { Express } from "express";
import authRoute from "./auth.route";
import question from "./question.route";

export default (app: Express) => {
  app.use(`/v1/api/${Endpoints.AUTH}`, authRoute);
  app.use(`/v1/api/${Endpoints.POST}`, question);
};
