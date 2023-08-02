import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authservices";
import {  AuthServiceInterface } from "../../application/services/authServicInterface";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
// import { userRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository";
import { allUsers,userHandle,getAUser,profileUpdate,followUser,followersList , followingList  , unFollowUser , userReport ,userSearch } from "../../application/useCases/user/user";
import { UserInfo } from "os";


const userController=(
    userDbRepository:UserDbInterface,
    userDbRepositoryImpl:UserRepositoryMongoDB
)=>{
    const dbRepositoryUser=userDbRepository(userDbRepositoryImpl())

    const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    
        const users = await allUsers(dbRepositoryUser);
        res.json({
          status: "success",
          users,
        });
      });

      const handleUser = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const isBlocked = await userHandle(id, dbRepositoryUser);
        res.json({
          status: "success",
          isBlocked,
        });


        
      });

      const getUserById= asyncHandler(async(req:Request , res:Response)=>{
        const { id } =req.params;
        const user= await getAUser(id,dbRepositoryUser)
        
        res.json({
          status:"success",
          user
        })
      })

      const updateProfile = asyncHandler(async (req: Request, res: Response) => {
        const displayPicture: any = req?.file?.path;
        const { name, userName, email, number, about, location,age } = req.body;
        const { id } = req.params;
        const user = {
          name,
          userName,
          email,
          number,
          about,
          location,
          age,
          displayPicture,
        };
        const updatedProfile = await profileUpdate(id, user, dbRepositoryUser);
        res.json({
          status: "success",
          updatedProfile,
        });
      });

      const putFollowUser = asyncHandler(async (req: Request, res: Response) => {
        const { friendId } = req.params;
        const { id } = req.body;
        const result = await followUser(id, friendId, dbRepositoryUser);
      
        res.json({
          status: "success",
          message: "follow request successfully",
          result,
        });
      });

      
      const putUnFollowUser = asyncHandler(async (req: Request, res: Response) => {
        const { friendId } = req.params;
 
        const { id } = req.body;
        const result = await unFollowUser(id, friendId, dbRepositoryUser);
        
        res.json({
          status: "success",
          message: "unfollow request successfully",
          result,
        });
      });


      const getUserFriends = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const followers = await followersList(id, dbRepositoryUser);
        
        res.json({
          status: "success",
          followers,
        });
      });

      const getUserFollowing = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
       
        const following = await followingList(id, dbRepositoryUser);
       
        res.json({
          status: "success",
          following,
        });
      });


      const reportUser = asyncHandler( async (req: Request, res: Response) => {
        const{id} = req.params
        const {userId,reason} = req.body
        const reportedUser = await userReport(id,userId,reason,dbRepositoryUser)
        res.json({
          status: "success",
          message: "Successfully reportedPost",
          reportedUser
        })
      })

      const searchUser = asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.query;
  
        if (!name) {
          // Return empty result
          res.json({
            status: "success",
            message: "No search query provided",
            result: [],
          });
        }
    
        const result = await userSearch(name, dbRepositoryUser);
        res.json({
          status: "success",
          message: "follow request successfully",
          result,
        });
      });
    

    
    
      return {
        getAllUsers,
        handleUser,
        getUserById,
        updateProfile,
        putFollowUser,
        putUnFollowUser,
        getUserFriends,
        getUserFollowing,
        reportUser,
        searchUser
        
        
      }

}

export default userController