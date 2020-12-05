import { BusinessLogic } from "../BusinessLogic";
import httpError from "../httpError";
import { db } from "../models";
import { Op } from "sequelize";

const userApplyCompany: BusinessLogic = async (req, res, next) => {
  const { companyId } = req.body;
  const user = await db.User.findOne({ where: { email: req.email } });
  db.Application.create({
    name: user!.name,
    user_email: user!.email,
    form: `/${req.file.filename}`,
    company_id: companyId,
    status: "서류접수중",
  });
  res.status(200).send("ok");
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

const applyCompanyList: BusinessLogic = async (req, res, next) => {
  const applications = await db.Application.findAll({
    where: { user_email: req.email },
    order: ["status"],
  });
  res.json(applications);
}

const applyGuysList: BusinessLogic = async (req, res, next) => {
  const companyId = req.params.company_id;
  const applications = await db.Application.findAll({
    where: { company_id: companyId },
    order: ["status"],
  });
  res.json(applications);
}

export {
  applyGuysList,
  applyCompanyList,
  userApplyCompany,
  passedUserApply,
  failedUserApply,
  sendDateApply,
}