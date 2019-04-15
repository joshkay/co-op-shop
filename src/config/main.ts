import 'reflect-metadata';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';

import { updateJwt } from '../middlewares/jwt';

import routes from '../routes';

export const init = (app, express, server) =>
{
  dotenv.config();
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use(updateJwt);

  app.use("/", routes);
}