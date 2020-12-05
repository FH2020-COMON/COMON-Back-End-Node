import { BusinessLogic } from "../BusinessLogic";
import httpError from "../httpError";
import { db } from "../models";
import { Op } from "sequelize";

const userApplyCompany: BusinessLogic = async (req, res, next) => {
  const { companyId } = req.body;
  const user = await db.User.findOne({ where: { email: req.decoded.email } });
  db.Application.create({
    name: user!.name,
    email: user!.email,
    form: `/hwp/${req.file.filename}`,
    companyId: companyId,
    status: "서류접수중",
  });
  res.status(200).send("ok");
}

const applyGuysList: BusinessLogic = async (req, res, next) => {
  const user = await db.User.findOne({ where: { email: req.decoded.email } });
  const companyId = user!.getDataValue("company");
  const company = await db.Company.findOne({ 
    where: { companyId: companyId }
  });
  if(company?.ceoName !== user?.name) {
    return new httpError(403, "Forbedden User");
  }
  const applyList = await db.Application.findAll({
    where: { [Op.and]: [{ companyId: company?.companyId }, { name: user?.name }]}
  });
  return res.status(200).json(applyList);
}

const failedUserApply: BusinessLogic = async (req, res, next) => {
  const { name, companyId } = req.body;
  db.Application.update({
    status: "불합격",
  }, {
    where: { [Op.and]: [{ name, companyId }] }
  });
  res.send("ok");
}

const passedUserApply: BusinessLogic = async (req, res, next) => {
  const { name, companyId } = req.body;
  db.Application.update({
    status: "합격",
  }, {
    where: { [Op.and]: [{ name, companyId }] }
  });
  res.send("ok");
}

const sendDateApply: BusinessLogic = async (req, res, next) => {
  const { date, name, companyId } = req.body;
  const dateInfo = +new Date(date);
  const sec = dateInfo - Date.now();
  if(sec < 1000 * 60 * 30) {
    db.Application.update({
      status: "면접가능",
    }, {
      where: { [Op.and]: [{ name, companyId }] }
    });
  } else {
    db.Application.update({
      status: "면접대기",
    }, {
      where: { [Op.and]: [{ name, companyId }] }
    });
  }
  res.send("ok");
}

export {
  userApplyCompany,
  applyGuysList,
  passedUserApply,
  failedUserApply,
  sendDateApply,
}