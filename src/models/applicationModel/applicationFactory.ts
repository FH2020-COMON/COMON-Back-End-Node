import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import ApplicationAttributes from "./attributes";
import { ApplicationInterface } from "../defaultInterfaceAttributes/model.interfaces";

const ApplicationFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<ApplicationInterface> => {
  const attributes: SequelizeAttributes<ApplicationAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, 
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    }, 
    form: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, 
    status: {
      type: Sequelize.ENUM,
      values: ["서류접수중", "합격", "불합격", "면접대기", "면접가능"],
    }, 
    date: {
      type: Sequelize.STRING(25),
    },
  };
  const Application = sequelize.define<ApplicationInterface, ApplicationAttributes>("applications", attributes);
  return Application;
}

export default ApplicationFactory