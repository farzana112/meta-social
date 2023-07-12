import { type } from "os";
import Post from "../models/postModel";

export const postRepositoryImp= () => {
    const createPost = async (post: {
        userId: string;
        description: string;
        image: string[] ;
        userName: string;
      }) => {
        
        
        const newPost = await new Post(post);
    
        return await newPost.save();
      };

    const getAllPosts = async () => {
        return await Post.find().sort({ createdAt: -1 });
      };

      return {
        createPost,
        getAllPosts
      }
}
export type postRepositoryType= typeof postRepositoryImp