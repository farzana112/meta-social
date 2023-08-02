import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

export const allUsers = async (
    repository: ReturnType<UserDbInterface>
  ) => {
    const users= await repository.getAllUsers();
  
    if (!users) {
      throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
    }
    return users;
  };
  export const userHandle = async (
    id: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const result = await repository.userHandle(id);
    if (!result) {
      throw new AppError("Cannot find User", HttpStatus.FORBIDDEN);
    }
    return result;
  }

  export const getAUser = async (
  id: string,
  repository: ReturnType<UserDbInterface>
  ) => {
    const result = await repository.getUserById(id)
    
    if (!result) {
      throw new AppError("Cannot find User", HttpStatus.FORBIDDEN);
    }
    return result;
  }

  export const profileUpdate = async (
    id: string,
    user: {
      name: string;
      userName: string;
      email: string;
      number: string;
      about: string;
      location: string;
      age:number;
      displayPicture: string | null;
    },
    repository: ReturnType<UserDbInterface>
  ) => {
    const updateProfile = await repository.updateProfile(id, user);
  
    if (!updateProfile) {
      throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
    }
    return updateProfile;
  }


  export const followUser = async (
    id: string,
    friendId: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const result = await repository.followUser(id, friendId);
    console.log(result)
    if (!result) {
      throw new AppError("user is already followed", HttpStatus.FORBIDDEN);
    }
    return result;
  }

  export const unFollowUser = async (
    id: string,
    friendId: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const result = await repository.unFollowUser(id, friendId);
    if (!result) {
      throw new AppError("user is already unfollowed", HttpStatus.FORBIDDEN);
    }
    return result;
  };

  export const followersList = async (
    id: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const followers = await repository.followersList(id);
   
    return followers;
  };


  export const followingList = async (
    id: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const followers = await repository.followingList(id);
 
    return followers;
  };


  export const userReport = async (
    id: string,
    userId: string,
    reason: string,
    repository: ReturnType<UserDbInterface>
  ) => {
    const reportUser = await repository.reportUser(id,userId,reason);
  
    if (!reportUser) {
      throw new AppError("Reported Already", HttpStatus.BAD_REQUEST);
    }
    return reportUser;
  };

  export const userSearch = async (
    name: any,
    repository: ReturnType<UserDbInterface>
  ) => {
    const result = await repository.userSearch(name);
    if (!result) {
      throw new AppError("user is already followed", HttpStatus.FORBIDDEN);
    }
    return result;
  };

