import { sequelize } from "../configs/connection";
import { DbInterface } from "./defaultInterfaceAttributes/db.interface";
import UserFactory from "./userModel/userFactory";
import CompanyFactory from "./companyModel/companyFactory";
import CompanyLikeFactory from "./companyLikeModel/companyLikeFactory";

const createModels = (): DbInterface => {
  const db: DbInterface = {
    sequelize,
    User: UserFactory(sequelize),
    Company: CompanyFactory(sequelize),
    CompanyLike: CompanyLikeFactory(sequelize),
  }
  return db;
}

export const db = createModels();