import User from "../models/userModel";
import Otp from "../models/otpModel"
export const userRepositoryMongoDB = () => {
    const addUser = async (user: {
        name: string;
        userName: string;
        email: string;
        age?:number;
        number?: number;
        password?: string;
      }) => {
        const newUser = new User(user);
       
    
        return await newUser.save();
      };
      const getUserByEmail = async (email: string) => {
        const user: any = await User.findOne({ email });
        return user;
      };


      const getUserByUserName = async (userName: string) => {
        const user: any = await User.findOne({ userName });
       return user;
      };



     const getUserByAge=async(age:number)=>{
        const user:any=await User.findOne({age})
        return user
      }

      
      
      const getAllUsers = async () => {
        try {
          const users = await User.find();
          return users;
        } catch (error) {
          console.error('Error fetching users:', error);
          throw error;
        }
      };

      
      const userHandle = async (id: string) => {
        try {
          const user: any = await User.findOne({ _id: id });
          if (!user) {
            return;
          }
          const newIsBlocked = !user.isBlocked;
          user.isBlocked = newIsBlocked;
          return await user.save();
        } catch (error) {
          console.error(`Error updating user with ID ${id}:`, error);
        }
      };

      
      
      const getUserById = async (id: string) => {
      try{
     
        const user: any = await User.findOne({ _id: id });
       

        return user;
      }catch(error){
        console.error(`Error updating user with ID ${id}:`, error);
       
      }
      };

      const sendMail= async (email:string) => {
        try{
        const user:any =await User.findOne( { email : email} )
        
        return user

        } catch(error){

          console.error("Error fetching the user with this email id")
          throw error
        }
      }


      const verifyOtp=async(otp:number) => {
      try{
        const data:any = await Otp.findOne({otp:otp})
        if(data){
          const user:any =await User.find({email:data.email})
          Otp.deleteMany({otp:otp})
          
          return user
        }

        return ;


      }catch(error) {
        console.error("Error fetching the user")
        throw error
      }
      }

      const updateProfile = async (
        id: string,
        user: {
          name: string;
          userName: string;
          email: string;
          number?: string;
          about?: string;
          location?: string;
          age?:number
          displayPicture?: string | null;
        }
      ) => {
        const updatedProfile: any = await User.findByIdAndUpdate(id, user, {
          new: true,
        });
        return updatedProfile;
      };

     
      
      
      const followersList: any = async (id: string) => {
        const user: any = await User.findOne({ _id: id }).select("-password");
       
        // Map user.followers to an array of promises
        const followersPromises = user?.followers?.map(async (id: string) => {
          return await User.findById(id).select("-password");
        });
      
        // Await the resolution of all promises using Promise.all
        const followers = await Promise.all(followersPromises);
       
      
        return followers;
      };


      // const followingList: Function = async (id: string) => {
      //   const user: any = await User.findOne({ _id: id }).select("-password");
      //   console.log("user")
      //   console.log(user)
      //   const following = await Promise.all(
      //     user?.following?.map(
      //       async (id: string) => await User.findById(id).select("-password")
      //     )
      //   );
      //   console.log("following   jfhsfuetyetyeyrtye")
      //   console.log(following)
    
      //   return following;
      // };



// adapted
      const followingList: Function = async (id: string) => {
        const user: any = await User.findOne({ _id: id }).select("-password");
      
      
        if (!user || !user.following) {
          return []; // Return an empty array if user or user.following is null or undefined
        }
        const following = await Promise.all(
          user?.following?.map(
            async (id: string) => await User.findById(id).select("-password")
          )
        );

       
    
        return following;
      }


    //   const followUser = async (id: string, friendId: string) => {
    //     const followingUser: any = await User.findOne({ _id: id });
    //     const follow: any = await User.findOne({ _id: friendId });
    //     if (!follow?.followers?.includes(id)) {
    //       await followingUser?.updateOne(
    //         {
    //           $push: {
    //             following: friendId,
    //           },
    //         },
    //         { new: true }
    //       );
    //       await follow?.updateOne(
    //         {
    //           $push: {
    //             followers: id,
    //           },
    //         },
    //         { new: true }
    //       );
    //     } else {
    //       await followingUser.updateOne(
    //         {
    //           $pull: {
    //             following: friendId,
    //           },
    //         },
    //         { new: true }
    //       );
    //       await follow.updateOne(
    //         {
    //           $pull: {
    //             followers: id,
    //           },
    //         },
    //         { new: true }
    //       );
    //     }
    //     const user: any = await User.findOne({ _id: id }).select("-password");
    //     const following = await Promise.all(
    //       user.following?.map(
    //         async (id: string) => await User.findById(id).select("-password")
    //       )
    //     );
    // console.log("following")
    // console.log(following)

    //     const followers = await Promise.all(
    //       user.followers?.map(
    //         async (id: string) => await User.findById(id).select("-password")
    //       )
    //     );
    //     console.log( "!!!!!!!!!!")
    //     console.log(followers)

    
    //     return { following, followers };
    //   };


    const followUser = async (id: string, friendId: string) => {
      const followingUser: any = await User.findOne({ _id: id });
      
      const follow: any = await User.findOne({ _id: friendId });
    
      if (!follow?.followers?.includes(id)) {
        await followingUser?.updateOne(
          {
            $push: {
              following: friendId,
            },
          },
          { new: true }
        );
        await follow?.updateOne(
          {
            $push: {
              followers: id,
            },
          },
          { new: true }
        );
      } else {
        await followingUser?.updateOne(
          {
            $pull: {
              following: friendId,
            },
          },
          { new: true }
        );
        await follow?.updateOne(
          {
            $pull: {
              followers: id,
            },
          },
          { new: true }
        );
      }
    
      const user: any = await User.findOne({ _id: id }).select("-password");
     
      const following = await Promise.all(
        (user.following || []).map(async (id: string) => await User.findById(id).select("-password"))
      );
     
    
      const followers = await Promise.all(
        (user.followers || []).map(async (id: string) => await User.findById(id).select("-password"))
      );
      
    
      return { following, followers };
    };
    


      const unFollowUser = async (id: string, friendId: string) => {
        let followingUser: any = await User.findOne({ _id: id });
        
        let follow: any = await User.findOne({ _id: friendId });
        
    
        if (followingUser?.following?.includes(friendId)) {
          await followingUser.updateOne(
            {
              $pull: {
                following: friendId,
              },
            },
            { new: true }
          );
          await follow?.updateOne(
            {
              $pull: {
                followers: id,
              },
            },
            { new: true }
          );
        } else {
          return null;
        }
        
        
        followingUser = await User.findOne({ _id: id });
       
        follow = await User.findOne({ _id: friendId });
        return {
          follow,
          followingUser,
        };
      };

      const reportUser = async (id: string, userId: string, reason: string) => {
        try {
          const user: any = await User.findById(id);
          const isReported = user.report.some((report: { userId: string }) => report.userId === userId);
          if (isReported) {
            return null;
          }
          user.report.push({ userId, reason });
          await user.save();
          return user;
        } catch (error) {
          console.error(error);
        }
      };

 
      
      // const userSearch = async (name: string) => {
      //   const user: any = await User.find({
      //     name: { $regex: `${name}`, $options: "i" },
      //   });
      
    
      //   return user;
      // };
     

      // const userSearch = async (name: string) => {
      //   try {
      //     const users = await User.find({
      //       name: { $regex: `.*${name}.*`, $options: "i" },
      //     });
      //    console.log(users)
      //     return users;
      //   } catch (error) {
      //     console.error("Error searching users:", error);
      //     throw error;
      //   }
      // };
      
    //   const userSearch = async(name:string) => {
    //     const regexPattern = new RegExp(`${name}`, 'i');
    //     return  await User.find({ userName: regexPattern });
    // }

    const userSearch = async (name: string) => {
      const regexPattern = new RegExp(name, 'i');
      return await User.find({ userName: regexPattern });
  }

return{
  addUser,
  getUserByEmail,
  getUserByUserName,
  getUserByAge,
  getAllUsers,
  userHandle,
  getUserById,
  sendMail,
  updateProfile,
  followUser,
  unFollowUser,
  followersList,
  followingList,
  reportUser,
  userSearch,
  verifyOtp
  


}
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
