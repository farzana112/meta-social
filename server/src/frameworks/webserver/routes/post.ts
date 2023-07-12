import express from "express"
import postController from "../../../adapters/controllers/postControllers"
import { postDbInterface} from "../../../application/repositories/postDbRepositoryInterface"
import { userDbRepository } from "../../../application/repositories/userDbRepository"
import { postRepositoryImp } from "../../database/Mongodb/repositories/postRepository"
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository"
import { upload } from "../../services/multer";

const postRouter= () =>{
    const router=express.Router();
    const controller=postController(postDbInterface,postRepositoryImp,userDbRepository,userRepositoryMongoDB)
    router.post("/",upload.array('picture',1),controller.createPost);
    router.get("/",controller.getPosts)

    return router
}
export default postRouter

