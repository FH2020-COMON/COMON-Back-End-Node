import Sequelize from "sequelize";
import { UserAttributes } from "../userModel/attributes";
import { CompanyAttributes } from "../companyModel/attributes";
import { CompanyLikeAttributes } from "../companyLikeModel/attributes";

interface UserInterface extends Sequelize.Model<UserAttributes, UserAttributes>, UserAttributes {}
interface CompanyInterface extends Sequelize.Model<CompanyAttributes, CompanyAttributes>, CompanyAttributes {} 
interface CompanyLikeInterface extends Sequelize.Model<CompanyLikeAttributes, CompanyLikeAttributes>, CompanyLikeAttributes {}

export {
  UserInterface,
  CompanyInterface,
  CompanyLikeInterface,
}