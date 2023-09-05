import express from "express"
import postController from "../../../adapters/controllers/postControllers"
import { postDbInterface} from "../../../application/repositories/postDbRepositoryInterface"
import { userDbRepository } from "../../../application/repositories/userDbRepository"
import { postRepositoryImp } from "../../database/Mongodb/repositories/postRepository"
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository"
import { upload } from "../../services/multer";
import  postMiddleware from "../middlewares/postMiddleware"
import userAuthMiddleware from "../middlewares/authMiddleware"


const postRouter= () =>{
    const router=express.Router();
    const controller=postController(postDbInterface,postRepositoryImp,userDbRepository,userRepositoryMongoDB)
    router.post("/",upload.array('picture',4),controller.createPost);
    router.get("/",controller.getPosts)
    router.get("/:userId",userAuthMiddleware,controller.getUserPost)
    router.delete('/:id',postMiddleware,controller.deletePost)
    router.put("/:postId",postMiddleware,controller.editPost)
    router.put("/:postId/comment",controller.commentPost)
    router.put("/:postId/commentDelete",controller.commentDelete)
    router.put('/:id/like',controller.likePost)
    router.put("/:postId/report",controller.reportPost)

    



    return router
}
export default postRouter

