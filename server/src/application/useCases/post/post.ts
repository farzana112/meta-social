import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { postDbInterfaceType } from "../../repositories/postDbRepositoryInterface";
import { UserDbInterface } from  "../../repositories/userDbRepository"

export const postCreate = async (
    post: {
        userId:string,
        description:string,
        image:string[],
        userName:string
    },
    repository: ReturnType<postDbInterfaceType>
) =>{
    const newPost=await repository.createPost(post)
    if (!newPost) {
        throw new AppError("post not created", HttpStatus.BAD_REQUEST);
      }
      return newPost

}


export const getAllPosts = async (
    repository: ReturnType<postDbInterfaceType>
  ) => {
    const getPosts = await repository.getAllPosts()
    if (!getPosts) {
      throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
    }
    return getPosts;
  };

  export const getUserPosts = async (
    id: string,
    repository: ReturnType<postDbInterfaceType>
  ) => {
    const getPosts = await repository.getUserPosts(id);
    if (!getPosts) {
      throw new AppError("Posts Are not Available", HttpStatus.BAD_REQUEST);
    }
    return getPosts;
  }; 

  export const postDelete = async (
    id: string,
    repository: ReturnType<postDbInterfaceType>
  ) => {
    const deletePost = await repository.deletePost(id);
    if (!deletePost) {
      throw new AppError("Post not deleted", HttpStatus.BAD_REQUEST);
    }
    return deletePost;
  };

  export const postEdit = async (
    postId: string,
    description: string,
    repository: ReturnType<postDbInterfaceType>
  ) => {
    const editPost = await repository.editPost(postId,description);
  
    if (!editPost) {
      throw new AppError("Post not Found", HttpStatus.BAD_REQUEST);
    }
    return editPost;
  };

  export const addComment = async (
    postId:string,
    userId:string,
    comment:string,
    repository:ReturnType<postDbInterfaceType>
  ) => {
    const commentAdd = await repository.addComment(postId,userId,comment)
    if(!commentAdd){
      throw new AppError("comment not added ",HttpStatus.BAD_REQUEST)
    }
    return commentAdd
  }

  export const deleteComment= async (
    postId:string,
    userId:string,
    
    index:number,
    repository:ReturnType<postDbInterfaceType>
  ) =>{

   const deleteComment= await repository.deleteComment(postId,userId,index)
   
   if(!deleteComment){
    throw new AppError("Post not found",HttpStatus.BAD_REQUEST)
   }
   return deleteComment

  }