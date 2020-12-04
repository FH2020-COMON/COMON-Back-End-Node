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
    room: {
      type: Sequelize.STRING(300),
      allowNull: false,
    }, 
    user: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    chat: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  };
  const Chat = sequelize.define<ChatInterface, ChatAttributes>("chats", attributes);
  return Chat;
}

export default ChatFactory;