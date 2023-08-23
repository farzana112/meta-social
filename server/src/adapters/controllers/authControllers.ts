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
  sendMail,
  verifyOtp,
  googleLogin
 } from "../../application/useCases/auth/userAuth";
import { log } from "console";
import Otp from "../../frameworks/database/Mongodb/models/otpModel";
import User from "../../frameworks/database/Mongodb/models/userModel"
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
        console.log("Hi")
        const { name, userName, email,age, number, password } = req.body;
        console.log(name,age,userName,email,number)
        console.log(req.body)
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
        
        
     
        const verifyToken=token.token
        const userId=token.user._id
      
       const otp=getMailService(email,verifyToken,userId)
       
       const otpDocument = new Otp({
        email: email,
        otp: otp,
        token: token.token, // Make sure you have the 'token' value available
      });
      await otpDocument.save();

      const setUserToken=await User.findByIdAndUpdate(
        { _id:userId},
        {verifyToken:verifyToken},
        {new:true}
      )
      
        res.json({
          status:"success",
         otp:otp,
          token,
          verifyToken
        })
      })

      const otpVerify= asyncHandler(async (req:Request , res:Response) => {
        const {otp} : {otp:number} = req.body
        console.log("req bdoy ")
        console.log(otp) 
        const user= await verifyOtp (
          otp,
          dbRepositoryUser,
          authService
        )

        console.log("user from authcontrolelr")
        console.log(user)

        res.json({
          status:"success",
         otp:otp,
         user
        })


        
      })


      const googleLoginUser = asyncHandler(async (req: Request, res: Response) => {
    
        // const firstName = req.body?.displayName.split(" ")[0];
        const userName: string = req.body?.displayName;
        const name: string = req.body?.displayName;
        const email: string = req.body?.email;
        const token = await googleLogin(
          userName,
          name,
          email,
          dbRepositoryUser,
          authService
        );
        console.log(token)
        res.json({
          status: "success",
          message: "new user registered",
          token: token,
        });
      });
      
      return{
        registerUser,
        loginUser,
        adminLogin,
        emailSend,
        otpVerify,
        googleLoginUser
      }

}
export default authController