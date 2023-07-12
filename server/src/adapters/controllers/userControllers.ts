import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authservices";
import {  AuthServiceInterface } from "../../application/services/authServicInterface";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
// import { userRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { allUsers,userHandle,getAUser } from "../../application/useCases/user/user";
import { UserInfo } from "os";


const userController=(
    userDbRepository:UserDbInterface,
    userDbRepositoryImpl:UserRepositoryMongoDB
)=>{
    const dbRepositoryUser=userDbRepository(userDbRepositoryImpl())

    const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    
        const users = await allUsers(dbRepositoryUser);
        res.json({
          status: "success",
          users,
        });
      });

      const handleUser = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const isBlocked = await userHandle(id, dbRepositoryUser);
        res.json({
          status: "success",
          isBlocked,
        });


        
      });

      const getUserById= asyncHandler(async(req:Request , res:Response)=>{
        const { id } =req.params;
        const user= await getAUser(id,dbRepositoryUser)
        
        res.json({
          status:"success",
          user
        })
      })

      return {
        getAllUsers,
        handleUser,
        getUserById
      }

}

export default userController