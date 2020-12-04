import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  [key: string]: any;
  session: any;
}

interface CustomResponse extends Response {
  [key: string]: any;
}

interface BusinessLogic {
  (req: CustomRequest, res: CustomResponse, next: NextFunction): any;
}

export {
  CustomRequest,
  CustomResponse,
  NextFunction,
  BusinessLogic
}