import 'reflect-metadata';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import * as dotenv from "dotenv";

import routes from '../routes';

export const init = (app, express) =>
{
  dotenv.config();
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use("/", routes);
}