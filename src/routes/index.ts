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

const applyUserListRouter = errorHandler(applyUserController.applyGuysList);
const applyCompanyListRoter = errorHandler(applyUserController.applyCompanyList);

const applyUserRouter = errorHandler(applyUserController.userApplyCompany);
const passedUserRouter = errorHandler(applyUserController.passedUserApply);
const failedUserRouter = errorHandler(applyUserController.failedUserApply);
const sendDateRouter = errorHandler(applyUserController.sendDateApply);

router.get("/company/room/list", sendRoomListRouter)
router.post("/company/room/create", verifyToken, createNewRoomRotuer);
router.post("/company/chat/:roomId", verifyToken, companyChattingRouter);

router.post("/recruiting/apply", verifyToken, uploadFileMiddleware.single("file"), applyUserRouter);
router.post("/recruiting/passed", verifyToken, passedUserRouter);
router.post("/recruiting/failed", verifyToken, failedUserRouter);
router.post("/recruiting/date", verifyToken, sendDateRouter);

router.get("/recruiting/list/user/:company_id", verifyToken, applyUserListRouter);
router.get("/recruiting/list/company", verifyToken, applyCompanyListRoter);

export default router;