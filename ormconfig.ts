import dotenv from "dotenv";
dotenv.config();

export default {
  type: "oracle",
  host: "adb.sa-saopaulo-1.oraclecloud.com",
  port: 1522,
  username: process.env.USER_ORACLE_CLOUD,
  password: process.env.PASS_ORACLE_CLOUD,
  database: "DB-COIN",
  connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.sa-saopaulo-1.oraclecloud.com))(connect_data=(service_name=${process.env.SERVICE_NAME_ORACLE_CLOUD}))(security=(ssl_server_dn_match=yes)))`,
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*.ts"],
};
