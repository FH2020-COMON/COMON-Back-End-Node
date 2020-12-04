import { BusinessLogic } from "../BusinessLogic";
import { db } from "../models";
import uuid from "uuid";
import { Socket } from "socket.io";
import httpError from "../httpError";

const joinAndMakeRoom: BusinessLogic = async (req, res, next) => {
  const roomId = uuid.v4();
  const user = await db.User.findOne({
    where: { email: req.decoded.email }
  });
  const userCompanyId = user?.getDataValue("company");
  const newRoom = await db.Room.create({
    title: req.body.title,
    roomId,
    companyId: userCompanyId!,
  });
  const io = req.app.get("io");
  const company: Socket = io.of("/company");
  company.join(roomId);
  company.emit("join Room", roomId);
  company.emit("newRoom", newRoom);
}

const addChat: BusinessLogic = async (req, res, next) => {
  const user = await db.User.findOne({
    where: { email: req.decoded.email },
  });
  const userEmail = user!.getDataValue("email");
  const chat = await db.Chat.create({
    user: userEmail,
    room: req.params.roomId,
    chat: req.body.chat,
  });
  req.app.get("io").of("/company").to(req.params.roomId).emit("chat", chat);
}