import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { UserAttributes } from "./attributes";
import { UserInterface } from "../defaultInterfaceAttributes/model.interfaces";

const UserFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<UserInterface> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    email: {
      type: Sequelize.STRING(255),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    user_type: {
      type: Sequelize.STRING(255),
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  };
  const User = sequelize.define<UserInterface, UserAttributes>("user", attributes);
  return User;
}

export default UserFactory;