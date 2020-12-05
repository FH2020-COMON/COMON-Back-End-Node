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

  return db;
}

export const db = createModels();