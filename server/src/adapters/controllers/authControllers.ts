import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authservices";
import { getMailService } from "../../frameworks/services/nodemailer";
import {  AuthServiceInterface } from "../../application/services/authServicInterface";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
// import { userRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { AdminRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/adminRepository"
import {  AdminDbInterface } from "../../application/repositories/adminDbRepository";
import {
  userRegister,
  userLogin,
  adminlogin,
  sendMail
 } from "../../application/useCases/auth/userAuth";
import { log } from "console";
import Otp from "../../frameworks/database/Mongodb/models/otpModel";

const authController=( 
    authServiceInterface:AuthServiceInterface,
    authServieImpl:AuthService,
    userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  adminDbRepository: AdminDbInterface,
  adminDbRepositoryImpl:AdminRepositoryMongoDB

 
    )=>
{
    const dbRepositoryUser=userDbRepository(userDbRepositoryImpl())
    const authService=authServiceInterface(authServieImpl())
  const dbRepositoryAdmin=adminDbRepository(adminDbRepositoryImpl())
    const registerUser = asyncHandler(async (req: Request, res: Response) => {
        
        const { name, userName, email,age, number, password } = req.body;
        const user = {
          name,
          userName,
          email,
          age,
          number,
      
          password,
        };
        
        const token = await userRegister(user, dbRepositoryUser, authService);
        
        res.json({
          status: "success",
          message: "new user registered",
          token: token,
        });
      });
      const loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { userName, password }: { userName: string; password: string } =
          req.body;
         
        const token = await userLogin(
          userName,
          password,
          dbRepositoryUser,
          authService
        );
       

        res.json({
          status: "success",
          message: "user verified",
          token,
        });
      });

      const adminLogin = asyncHandler(async (req: Request, res: Response) => {
        const { userName, password }: { userName: string; password: string } =
          req.body;
        
        const token = await adminlogin(
          userName,
          password,
          dbRepositoryAdmin,
          authService
        );
        res.json({
          status: "success",
          message: "user verified",
          token,
        });
      });

      const emailSend =asyncHandler(async ( req: Request , res:Response) => {
        const { email } : { email : string } =
        req.body
        
        const token = await sendMail (
          email,
          dbRepositoryUser,
          authService
        )
        
        console.log(token.token)
       const otp=getMailService(email)
       console.log("otp"+otp)
       const otpDocument = new Otp({
        email: email,
        otp: otp,
        token: token.token, // Make sure you have the 'token' value available
      });
      await otpDocument.save();
      
        res.json({
          status:"success",
         otp:otp,
          token
        })
      })
      
      return{
        registerUser,
        loginUser,
        adminLogin,
        emailSend
      }

}
export default authController