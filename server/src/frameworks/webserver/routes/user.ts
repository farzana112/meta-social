import express from "express"
import userController from "../../../adapters/controllers/userControllers"
import { userDbRepository } from "../../../application/repositories/userDbRepository"
import { authServiceInterface } from "../../../application/services/authServicInterface"
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository"
import {  authService } from "../../services/authservices";
import  userAuthMiddleware from "../middlewares/authMiddleware"

const userRouter=()=>{
    const router=express.Router();

  const controller = userController(userDbRepository, userRepositoryMongoDB);
    router.get("/getUsers",controller.getAllUsers)
    router.put("/:id/userHandle", controller.handleUser);
    router.get("/:id",userAuthMiddleware,controller.getUserById)
    
return router
}

export default userRouter