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

  // company-user association 1 : n
  db.Company.hasMany(db.User, { foreignKey: "company", sourceKey: "companyId", as: "Applyment" });
  db.User.belongsTo(db.Company, { foreignKey: "company", targetKey: "companyId", as: "Applyment" });

  // company-room association 1: n
  db.Company.hasMany(db.Room, { foreignKey: "companyId", sourceKey: "companyId" });
  db.Room.belongsTo(db.Company, { foreignKey: "companyId", targetKey: "companyId" });

  // room-chat association 1: n
  db.Room.hasMany(db.Chat, { foreignKey: "room", sourceKey: "roomId", as: "Chatting" });
  db.Chat.belongsTo(db.Room, { foreignKey: "room", targetKey: "roomId", as: "Chatting" });

  // application associction n : m
  db.User.belongsToMany(db.Company, { foreignKey: "email", through: "application" });
  db.Company.belongsToMany(db.User, { foreignKey: "companyId", sourceKey: "companyId", through: "application" });
  return db;
}

export const db = createModels();