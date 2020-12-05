import jwt, { VerifyOptions } from "jsonwebtoken";

import { BusinessLogic } from "../BusinessLogic";

const verifyToken: BusinessLogic = (req, res, next) => {
  try {
    const token: any = req.headers["authorization"];
    if(!token) {
      return res.status(400).json({
        code: 400,
        message: "Bad Request",
      });
    }
    console.log(req.headers);
    console.log(token.slice(7));
    jwt.verify(token.slice(7), process.env.JWT_SECRET!, { algorithms: ["HS512"] }, (err, decoded) => {
      if(err) {
        console.log(err.message);
        return res.status(401).json({
          code: 401,
          message: "Unauthorized token",
        });
      }
      res.decoded = decoded;
      next();
    });
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