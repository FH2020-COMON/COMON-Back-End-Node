import jwt from "jsonwebtoken";
import axios from "axios";

import { BusinessLogic } from "../BusinessLogic";

const verifyToken: BusinessLogic = async (req, res, next) => {
  try {
    const token: any = req.headers["authorization"];
    if(!token) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
      });
    }
    const verified = await axios.get(`http://ec2-54-180-98-91.ap-northeast-2.compute.amazonaws.com:8000/auth/${token}`);
    console.log(verified);
    req.decoded = verified.data;
    next();
  } catch(err) {
    console.error(err);
    if(err.name === "TokenExpiredError") {
      return res.status(401).json({
        code: 419,
        message: "Expired token",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "Unauthorized token",
    });
  }
} 

export default verifyToken;