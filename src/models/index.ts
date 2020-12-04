import { sequelize } from "../configs/connection";
import { DbInterface } from "./defaultInterfaceAttributes/db.interface";
import UserFactory from "./userModel/userFactory";
import CompanyFactory from "./companyModel/companyFactory";
import CompanyLikeFactory from "./companyLikeModel/companyLikeFactory";
import ChatFactory from "./chatModel/chatFactory";
import RoomFactory from "./roomModel/roomFactory";

const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
    Company: CompanyFactory(sequelize),
    CompanyLike: CompanyLikeFactory(sequelize),
    Chat: ChatFactory(sequelize),
    Room: RoomFactory(sequelize),
  };

  // like association
  db.User.belongsToMany(db.Company, { through: "company_likes", foreignKey: "userId" });
  db.Company.belongsToMany(db.User, { through: "company_likes", foreignKey: "companyId" });

  // camany-room association
  db.Company.hasMany(db.Room, { foreignKey: "companyId", sourceKey: "companyId" });
  db.Room.belongsTo(db.Company, { foreignKey: "companyId", targetKey: "companyId" });

  // room-chat association
  db.Room.hasMany(db.Chat, { foreignKey: "room", sourceKey: "roomId" });
  db.Chat.belongsTo(db.Room, { foreignKey: "room", targetKey: "roomId" });

  return db;
}

export const db = createModels();