import { DataSource } from "typeorm";

import { HistoryBTC } from "../entities/HistoryBTC";
import cfgOrm from "../../ormconfig";

export const AppDataSource = new DataSource({
  type: "oracle",
  host: cfgOrm.host,
  port: cfgOrm.port,
  username: cfgOrm.username,
  password: cfgOrm.password,
  connectString: cfgOrm.connectString,
  database: cfgOrm.database,
  synchronize: true,
  logging: false,
  entities: [HistoryBTC],
});

export async function createConnection() {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}
