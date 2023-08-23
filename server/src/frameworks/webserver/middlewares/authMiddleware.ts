
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { authService } from "../../services/authservices";

const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = ""; 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log("no token")
    throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
  }
  try {
    const { payload }: any = authService().verifyToken(token);
    console.log("payload")
    console.log(payload)

    next();
  } catch (err) {
    throw new AppError("UnAuthorized User", HttpStatus.UNAUTHORIZED);
  }
};

export default userAuthMiddleware;
