import { Sequelize, Options } from "sequelize";
import databaseConfigList from "./database.config";

const env = "production";
const config: Options = databaseConfigList[env];

export const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  {
    host: config.host!,
    dialect: "mysql",
    define: {
      timestamps: false,
    } 
  }
);