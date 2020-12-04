import { Router } from "express";
import errorHandler from "../errorHandler";
import verifyToken from "../middleware/VerifyToken";
import uploadFileMiddleware from "../middleware/uploadFiles";

import * as chattingController from "../controllers/chat";
import * as applyUserController from "../controllers/apply";

const router: Router = Router();

const sendRoomListRouter = errorHandler(chattingController.informationRooms);
const createNewRoomRotuer = errorHandler(chattingController.createNewRoom);
const companyChattingRouter = errorHandler(chattingController.addCompanyChat);

const applyUserRouter = errorHandler(applyUserController.userApplyCompany);

router.get("/company/room/list", verifyToken, sendRoomListRouter)
router.post("/company/room/create", verifyToken, createNewRoomRotuer);
router.post("/company/chat/:roomId", verifyToken, companyChattingRouter);

router.post("/recruiting/apply", verifyToken, uploadFileMiddleware.single("hwp"), applyUserRouter);

export default router;