import Sequelize from "sequelize";
import * as Interfaces from "./model.interfaces";

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  User: Sequelize.ModelCtor<Interfaces.UserInterface>;
  Company: Sequelize.ModelCtor<Interfaces.CompanyInterface>;
  CompanyLike: Sequelize.ModelCtor<Interfaces.CompanyLikeInterface>;
  Chat: Sequelize.ModelCtor<Interfaces.ChatInterface>;
  Room: Sequelize.ModelCtor<Interfaces.RoomInterface>;
}