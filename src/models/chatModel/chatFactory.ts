import Sequelize from "sequelize";
import { SequelizeAttributes } from "../defaultInterfaceAttributes/sequelize.attributes";
import ChatAttributes from "../chatModel/attributes";
import { ChatInterface } from "../defaultInterfaceAttributes/model.interfaces";

const ChatFactory = (sequelize: Sequelize.Sequelize): Sequelize.ModelCtor<ChatInterface> => {
  const attributes: SequelizeAttributes<ChatAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    room_id: {
      type: Sequelize.STRING(300),
      allowNull: false,
    }, 
    user_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    chat: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    }
  };
  const Chat = sequelize.define<ChatInterface, ChatAttributes>("chat", attributes);
  return Chat;
}

export default ChatFactory;