import * as http from "http";
import * as express from 'express';
import * as mainConfig from './config/main';
import * as clientConfig from './config/client';
import { AddressInfo } from "net";
import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import * as PostgressConnectionStringParser from "pg-connection-string";

const port = process.env.PORT || 5000;

const init = async () =>
{
  if (process.env.DATABASE_URL)
  {
    const databaseUrl: string = process.env.DATABASE_URL;
    const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
    
    const typeOrmOptions: ConnectionOptions = {
      type: "postgres",
      host: connectionOptions.host,
      port: connectionOptions.port,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      synchronize: true,
      entities: ["build/src/entity/**/*.js"],
      extra: {
          ssl: true
      }
    };

    await createConnection(typeOrmOptions);
  }
  else
  {
    await createConnection();
  }

  const app = express();

  let server: http.Server = app.listen(port);
  
  mainConfig.init(app, express, server);
  clientConfig.init(app, express);

  server.on('listening', () =>
  {
    const addressInfo: AddressInfo = <AddressInfo>server.address();
    console.log(`Server is listening on PORT ${addressInfo.port}`);
  });
}

init();
