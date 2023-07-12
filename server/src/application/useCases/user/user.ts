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
