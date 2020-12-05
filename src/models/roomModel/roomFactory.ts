import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import RoomAttibutes from "./attributes";
import { RoomInterface } from "../defaultInterfaceAttributes/model.interfaces";

const RoomFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<RoomInterface> => {
  const attributes: SequelizeAttributes<RoomAttibutes> = {
    room_id: {
      type: Sequelize.STRING(300),
      primaryKey: true,
      unique: true,
    }, 
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  };
  const Room = sequelize.define<RoomInterface, RoomAttibutes>("room", attributes);
  return Room;
};

export default RoomFactory;