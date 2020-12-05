import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { CompanyLikeAttributes } from "./attributes";
import { CompanyLikeInterface } from "../defaultInterfaceAttributes/model.interfaces";

const CompanyLikeFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<CompanyLikeInterface> => {
  const attributes: SequelizeAttributes<CompanyLikeAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  };
  const CompanyLike = sequelize.define<CompanyLikeInterface, CompanyLikeAttributes>("company_like", attributes);
  return CompanyLike;
}

export default CompanyLikeFactory;