import { BusinessLogic } from "../BusinessLogic";
import { db } from "../models";
import { v4 } from "uuid";
import { Socket } from "socket.io";

const informationRooms: BusinessLogic = async (req, res, next) => {
  const user = await db.User.findOne({ where: { email: req.email  } });
  const companyRooms = await db.Room.findAll({
    where: { company_id: user!.company_id },
    include: {
      model: db.Chat,
      order: ["createdAt"],
    },
  });
  res.json(companyRooms);
}

const myInformation: BusinessLogic = async (req, res, next) => {
  const user = await db.User.findOne({
    where: { email: req.email },
    attributes: ["company_id"],
  });
  if(!(user!.company_id)) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  const company = await db.Company.findOne({
    where: { company_id: user!.company_id }
  });
  res.send(company!.company_name);
}

const createNewRoom: BusinessLogic = async (req, res, next) => {
  const roomId = v4();  
  const user = await db.User.findOne({
    where: { email: req.email }
  });
  const userCompanyId = user!.company_id;
  const newRoom = await db.Room.create({
    title: req.body.title,
    room_id: roomId,
    company_id: userCompanyId!,
  });
  const io = req.app.get("io");
  const company: Socket = io.of("/company");
  company.join(roomId);
  company.emit("join Room", roomId);
  company.emit("newRoom", newRoom);
  res.status(200).send("ok");
}

const addCompanyChat: BusinessLogic = async (req, res, next) => {
  const user = await db.User.findOne({
    where: { email: req.email },
  });
  const userName = user!.getDataValue("name");
  const chat = await db.Chat.create({
    user_name: userName,
    room_id: req.params.roomId,
    chat: req.body.chat,
    createdAt: new Date(),
  });
  req.app.get("io").of("/company").emit("chat", chat);
  console.log("chatting to ", req.params.roomId);
  res.status(200).send("ok");
}

export {
  informationRooms,
  createNewRoom,
  addCompanyChat,
  myInformation
}
