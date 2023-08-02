import express from "express"
import userController from "../../../adapters/controllers/userControllers"
import { userDbRepository } from "../../../application/repositories/userDbRepository"
import { authServiceInterface } from "../../../application/services/authServicInterface"
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository"
import {  authService } from "../../services/authservices";
import  userAuthMiddleware from "../middlewares/authMiddleware"
import {upload} from "../../services/multer"
const userRouter=()=>{
    const router=express.Router();

  const controller = userController(userDbRepository, userRepositoryMongoDB);
    router.get("/search",userAuthMiddleware,controller.searchUser)
    router.get("/getUsers",controller.getAllUsers)
    router.put("/:id/userHandle", controller.handleUser);
    router.get("/:id",userAuthMiddleware,controller.getUserById)
    router.put("/:id/updateProfile",upload.single("picture"),controller.updateProfile)
    router.put("/:friendId/follow",userAuthMiddleware, controller.putFollowUser);
    router.put("/:friendId/unFollow",userAuthMiddleware, controller.putUnFollowUser);
    router.get("/:id/followers",userAuthMiddleware, controller.getUserFriends);
    router.get("/:id/following",userAuthMiddleware,controller.getUserFollowing)
    router.put("/:id/report",userAuthMiddleware,controller.reportUser)
   




    
return router
}

export default userRouter