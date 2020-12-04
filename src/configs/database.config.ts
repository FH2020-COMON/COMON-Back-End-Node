import * as dotenv from "dotenv";
import path from "path";
import { Options } from "sequelize";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface DatabaseConfigList {
  [env: string]: Options;
}

const config: DatabaseConfigList = {
  production: {
    username: process.env.PRODUCTION_USER_NAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    dialect: "mysql"
  }
}

export { DatabaseConfigList };
export default config;
