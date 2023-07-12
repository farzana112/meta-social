import { UserRepositoryMongoDB } from "../../frameworks/database/Mongodb/repositories/userRepository"
export const userDbRepository = (
    repository: ReturnType<UserRepositoryMongoDB>
    ) => {
        const addUser = async (user: {
        name: string;
        userName: string;
        email: string;
        age:number;
        number?: number;
        password?: string;
      }) => {
        return await repository.addUser(user);
      };

      const getUserByEmail = async (email: string) =>
    await repository.getUserByEmail(email);

    const getUserByUserName=async(userName:string)=>
        await repository.getUserByUserName(userName)

    
    const getUserByAge=async(age:number)=>
        await repository.getUserByAge(age)
    
const getAllUsers=async()=>
  await repository.getAllUsers()


  const userHandle = async (id: string) =>
  await repository.userHandle(id);

  const getUserById= async(id:string)=>
    await repository.getUserById(id)
  

      return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        getUserByAge,
        getAllUsers,
        userHandle,
        getUserById
      }
    }
    
export type UserDbInterface = typeof userDbRepository;
    