import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { CompanyAttributes } from "./attributes";
import { CompanyInterface } from "../defaultInterfaceAttributes/model.interfaces";

const CompanyFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<CompanyInterface> => {
  const attributes: SequelizeAttributes<CompanyAttributes> = {
    companyId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    ceoName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    likes: {
      type: Sequelize.BIGINT,
      allowNull: false,
    }
  };
  const Company = sequelize.define<CompanyInterface, CompanyAttributes>("company", attributes);
  return Company;
}

export default CompanyFactory;