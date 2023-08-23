"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const authservices_1 = require("../../services/authservices");
const postModel_1 = __importDefault(require("../../../frameworks/database/Mongodb/models/postModel"));
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
const checkPostOwnershipMiddleware = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const post = await postModel_1.default.findById(postId);
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new appError_1.default("Token not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        // Verify the token and get the user ID from it
        const { payload } = (0, authservices_1.authService)().verifyToken(token);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId.toString() === payload) {
            console.log("User is the owner");
            next(); // User is the owner, allow the update or delete
        }
        else {
            console.log("User is NOT the owner");
            throw new appError_1.default("You are not authorized to edit this post", httpStatus_1.HttpStatus.FORBIDDEN);
        }
    }
    catch (error) {
        console.log(error);
        // Handle the error and send a response
        res.status(error.statusCode || httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: error.message || "Server error",
        });
    }
};
exports.default = checkPostOwnershipMiddleware;
