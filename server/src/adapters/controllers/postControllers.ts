import { Request, Response} from "express"
import asyncHandler from "express-async-handler"
import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"
import { postDbInterfaceType } from "../../application/repositories/postDbRepositoryInterface"
import { UserDbInterface } from "../../application/repositories/userDbRepository"
import { UserRepositoryMongoDB, userRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository"
import {
    postCreate,getAllPosts,getUserPosts,postDelete, postEdit , addComment,deleteComment,postLike , postReport
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
        
        const files:any=req?.files
        
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

  const getUserPost = asyncHandler ( async (req:Request, res: Response) => {
    const {userId} = req.params
    const posts = await getUserPosts(userId, dbRepositoryPost)
    res.json({
      status : "success",
      posts
    })
  })

  const deletePost = asyncHandler( async (req:Request, res: Response) => {
    const {id} = req.params
    const post = await postDelete(id, dbRepositoryPost)
    res.json({
      status : "success",
      message: "Successfully post deleted",
      post
    })
  })

  const editPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {description} = req.body
    const editedPost = await postEdit(postId,description,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Post Edited ",
      editedPost
    })
  })

  const commentPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,comment} = req.body
    const commentAdded = await addComment(postId,userId,comment,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully commentAdded",
      commentAdded
    })
  })

  const commentDelete = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,index} = req.body
    const deletedComment = await deleteComment(postId,userId,index,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Comment Deleted",
      deletedComment
    })
  })

  const likePost = asyncHandler( async (req: Request, res: Response) => {
    const{id} = req.params
    const{loggedId} = req.body
    
    const likedPost = await postLike(id,loggedId,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully liked",
      likedPost
    })
  })


  const reportPost = asyncHandler( async (req: Request, res: Response) => {
    const{postId} = req.params
    const {userId,reason} = req.body
    const reportedPost = await postReport(postId,userId,reason,dbRepositoryPost)
    res.json({
      status: "success",
      message: "Successfully report",
      reportedPost
    })
  })
return{

     createPost,
     getPosts,
     getUserPost,
     deletePost,
     editPost,
     commentPost,
     commentDelete,
     likePost,
     reportPost



}
}

export default postController