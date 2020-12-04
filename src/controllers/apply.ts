import { BusinessLogic } from "../BusinessLogic";
import { db } from "../models";

const userApplyCompany: BusinessLogic = async (req, res, next) => {
  const { companyId } = req.body;
  const user = await db.User.findOne({ where: { email: req.decoded.email } });
  const applications = await db.Application.create({
    name: user!.name,
    email: user!.email,
    form: req.file.filename,
    companyId: companyId,
    status: "PEND",
  });
  res.status(200).send("ok");
}

export {
  userApplyCompany,
}