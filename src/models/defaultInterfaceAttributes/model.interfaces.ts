import Sequelize from "sequelize";
import { UserAttributes } from "../userModel/attributes";
import { CompanyAttributes } from "../companyModel/attributes";
import { CompanyLikeAttributes } from "../companyLikeModel/attributes";
import ChatAttributes from "../chatModel/attributes";
import RoomAttributes from "../roomModel/attributes";
import ApplicationAttributes from "../applicationModel/attributes";

interface UserInterface extends Sequelize.Model<UserAttributes, UserAttributes>, UserAttributes {}
interface CompanyInterface extends Sequelize.Model<CompanyAttributes, CompanyAttributes>, CompanyAttributes {} 
interface CompanyLikeInterface extends Sequelize.Model<CompanyLikeAttributes, CompanyLikeAttributes>, CompanyLikeAttributes {}
interface ChatInterface extends Sequelize.Model<ChatAttributes, ChatAttributes>, ChatAttributes {}
interface RoomInterface extends Sequelize.Model<RoomAttributes, RoomAttributes>, RoomAttributes {}
interface ApplicationInterface extends Sequelize.Model<ApplicationAttributes, ApplicationAttributes>, ApplicationAttributes {}

export {
  UserInterface,
  CompanyInterface,
  CompanyLikeInterface,
  ChatInterface,
  RoomInterface,
  ApplicationInterface,
}