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

      const getUserPosts=async (id: string)=>{
        return await Post.find({userId:id}).sort({createdAt: -1})
      }

      const editPost = async (postId: string, description: string) => {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { description },
            { new: true }
          );
          return updatedPost;
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };


      const deletePost = async (id: string) => {
        const postDeleted: any = await Post.findByIdAndDelete({ _id: id });
        return postDeleted;
      };



      const addComment = async (postId:string, userId:string , comment:string) => {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: { userId, comment } } },
            { new: true }
          );
          return updatedPost;
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };

      const deleteComment = async ( postId:string, userId:string, index:number) => {
        try{
          const post= await Post.findById(postId)
          if(!post){
            return
          }
          post.comments.splice(index,1)
          await post.save();

          return post

        }catch(error){
          console.error(error)
          
        }
      }

      const likePost = async (id: string, loggedId: string) => {
        const post: any = await Post.findById({ _id: id });

        
    if(!post){
      return
    }
        if (!post.likes.includes(loggedId)) {
          await post.updateOne(
            {
              $push: {
                likes: loggedId,
              },
            },
            { new: true }
          );

        } else {
          await post.updateOne(
            {
              $pull: {
                likes: loggedId,
              },
            },
            { new: true }
          );
        }
       
        return post;
      };

      const reportPost = async (postId: string, userId: string, reason: string) => {
        try {
          const post: any = await Post.findById(postId);
          const isReported = post.report.some(
            (report: { userId: string; }) => report.userId === userId
          );
          if (isReported) {
            return null;
          }
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { report: { userId, reason } } },
            { new: true }
          );
          return updatedPost;
        } catch (error) {
          console.error(error);
        }
      };
      



    

      
      return {
        createPost,
        getAllPosts,
        getUserPosts,
        deletePost,
        editPost,
        addComment,
        deleteComment,
        likePost,
        reportPost
        
      }

      
}
export type postRepositoryType= typeof postRepositoryImp