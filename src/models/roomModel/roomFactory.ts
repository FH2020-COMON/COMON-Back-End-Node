import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import RoomAttibutes from "./attributes";
import { RoomInterface } from "../defaultInterfaceAttributes/model.interfaces";

const RoomFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<RoomInterface> => {
  const attributes: SequelizeAttributes<RoomAttibutes> = {
    roomId: {
      type: Sequelize.STRING(300),
      primaryKey: true,
      unique: true,
    }, 
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  };
  const Room = sequelize.define<RoomInterface, RoomAttibutes>("rooms", attributes);
  return Room;
};

export default RoomFactory;