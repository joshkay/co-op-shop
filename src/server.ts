import * as http from "http";
import { app } from './app';
import { AddressInfo } from "net";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

const port = process.env.PORT || 5000;

const init = async () =>
{
  let connection: Connection = await createConnection();

  let server: http.Server = app.listen(port);

  server.on('listening', () =>
  {
    const addressInfo: AddressInfo = <AddressInfo>server.address();
    console.log(`Server is listening on PORT ${addressInfo.port}`);
  });
}

init();