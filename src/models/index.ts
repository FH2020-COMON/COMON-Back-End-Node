import { sequelize } from "../configs/connection";
import { DbInterface } from "./defaultInterfaceAttributes/db.interface";
import UserFactory from "./userModel/userFactory";
import CompanyFactory from "./companyModel/companyFactory";
import CompanyLikeFactory from "./companyLikeModel/companyLikeFactory";
import ChatFactory from "./chatModel/chatFactory";
import RoomFactory from "./roomModel/roomFactory";
import ApplicationFactory from "./applicationModel/applicationFactory";

const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
    Company: CompanyFactory(sequelize),
    CompanyLike: CompanyLikeFactory(sequelize),
    Chat: ChatFactory(sequelize),
    Room: RoomFactory(sequelize),
    Application: ApplicationFactory(sequelize),
  };

  // room-chat association 1: n 
  db.Room.hasMany(db.Chat, { foreignKey: "room_id", sourceKey: "room_id" });
  db.Chat.belongsTo(db.Room, { foreignKey: "room_id", targetKey: "room_id" });

  db.User.hasMany(db.Chat, { foreignKey: "user_name", sourceKey :"name" });
  db.Chat.belongsTo(db.User, { foreignKey: "user_name", targetKey: "name" });

  db.User.hasMany(db.Application, { foreignKey: "user_email", sourceKey: "email" });
  db.Application.belongsTo(db.User, { foreignKey: "user_email", targetKey: "email" });

  db.Company.hasMany(db.Application, { foreignKey: "company_id", sourceKey: "company_id" });
  db.Application.belongsTo(db.Company, { foreignKey: "company_id", targetKey: "company_id" });

  db.Company.hasMany(db.Room, { foreignKey: "company_id", sourceKey: "company_id" });
  db.Room.belongsTo(db.Company, { foreignKey: "company_id", targetKey: "company_id" });

  return db;
}

export const db = createModels();