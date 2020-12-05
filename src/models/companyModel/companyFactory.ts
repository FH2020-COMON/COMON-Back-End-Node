import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { CompanyAttributes } from "./attributes";
import { CompanyInterface } from "../defaultInterfaceAttributes/model.interfaces";

const CompanyFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<CompanyInterface> => {
  const attributes: SequelizeAttributes<CompanyAttributes> = {
    company_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company_address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    company_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    likes: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    owner_email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    }
  };
  const Company = sequelize.define<CompanyInterface, CompanyAttributes>("company", attributes);
  return Company;
}

export default CompanyFactory;