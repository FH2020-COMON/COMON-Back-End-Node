import { Router } from "express";
import errorHandler from "../errorHandler";
import verifyTokenMiddleware from "../middleware/VerifyToken";

import * as chattingController from "../controllers/chat";
import * as applyUserController from "../controllers/apply";

const router: Router = Router();

const sendRoomListRouter = errorHandler(chattingController.informationRooms);
const createNewRoomRotuer = errorHandler(chattingController.createNewRoom);
const companyChattingRouter = errorHandler(chattingController.addCompanyChat);

router.get("/company/room/list", verifyTokenMiddleware, sendRoomListRouter)
router.post("/company/room/create", verifyTokenMiddleware, createNewRoomRotuer);
router.post("/company/chat/:roomId", verifyTokenMiddleware, companyChattingRouter);