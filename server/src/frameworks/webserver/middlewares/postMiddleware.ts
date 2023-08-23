import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { authService } from "../../services/authservices";
import Post from "../../../frameworks/database/Mongodb/models/postModel"; 
// const checkPostOwnershipMiddleware = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try 
//     {
//       const postId = req.params.postId; // Assuming the postId is in the URL
//       // Fetch the post from the database
//     const post = await Post.findById(postId);
//     const token = req.headers.authorization?.split(" ")[1]; // Get the token from headers

//     if (!token) {
//       throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
//     }

//     // Verify the token and get the user ID from it
//     const { payload }: any = authService().verifyToken(token);
    

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     console.log(post.userId.toString())
//     if (post.userId.toString()===payload) {
        
//         console.log("user is the owner")
//         next(); // User is the owner, allow the update or delete
//       } else {
//         console.log("User is NOT the owner");
//         throw new AppError("You are not authorized to edit this post", HttpStatus.FORBIDDEN);
//       }
//           } catch(error) {
//           console.log(error)
//         throw new AppError("You are not authorized to edit this post", HttpStatus.FORBIDDEN);
      

       
//     }
// }

const checkPostOwnershipMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
      }
  
      // Verify the token and get the user ID from it
      const { payload }: any = authService().verifyToken(token);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.userId.toString() === payload) {
        console.log("User is the owner");
        next(); // User is the owner, allow the update or delete
      } else {
        console.log("User is NOT the owner");
        throw new AppError("You are not authorized to edit this post", HttpStatus.FORBIDDEN);
      }
    } catch (error:any) {
      console.log(error);
  
      // Handle the error and send a response
      res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: error.message || "Server error",
      });
    }
  };
  
export default checkPostOwnershipMiddleware;