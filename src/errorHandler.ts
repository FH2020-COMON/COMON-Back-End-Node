import { BusinessLogic, CustomRequest, CustomResponse, NextFunction } from "./BusinessLogic";

const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      console.log(err);
      next(err);
    }
  }
}

export default errorHandler;