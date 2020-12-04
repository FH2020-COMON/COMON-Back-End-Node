import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import { UserAttributes } from "./attributes";
import { UserInterface } from "../defaultInterfaceAttributes/model.interfaces";

const UserFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<UserInterface> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    email: {
      type: Sequelize.STRING(100),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    userType: {
      type: Sequelize.ENUM(),
      values: ["OWNER", "EXECUTIVE", "APPLICANT"],
    },
    company: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  };
  const User = sequelize.define<UserInterface, UserAttributes>("users", attributes);
  return User;
}

export default UserFactory;