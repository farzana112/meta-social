import { Request, Response} from "express"
import asyncHandler from "express-async-handler"
import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"
import { postDbInterfaceType } from "../../application/repositories/postDbRepositoryInterface"
import { UserDbInterface } from "../../application/repositories/userDbRepository"
import { UserRepositoryMongoDB, userRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository"
import {
    postCreate,getAllPosts
} from "../../application/useCases/post/post"
const postController = (
    postDbInterface:postDbInterfaceType,
    postDbImp:postRepositoryType,
    userDbRepository:UserDbInterface,
    userDbRepositoryImpl:UserRepositoryMongoDB

) => {
    const dbRepositoryPost = postDbInterface(postDbImp());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl())
    const createPost= asyncHandler( async (req:Request , res:Response)=>{
        const image:string[] =[]
        const { userId, description , userName} =req.body
        console.log(req.body)
        const files:any=req?.files
        console.log(files)
        for(const file of files){
            const picture= file.path;
            image.push(picture)
        }
        const post = { userId, description, image, userName };

        const newPost = await postCreate(post, dbRepositoryPost);
      
        res.json({
          status: "success",
          newPost,
        });
      });

       
  const getPosts = asyncHandler ( async (req:Request, res: Response) => {
    const posts = await getAllPosts(dbRepositoryPost)
   
    res.json({
      status : "success",
      posts
    })
  })

  
return{

     createPost,
     getPosts

}
}

export default postController