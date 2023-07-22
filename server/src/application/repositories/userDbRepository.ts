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

    const sendMail=async(email:string) => 
      await repository.sendMail(email);
    

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
    ) => await repository.updateProfile(id, user);


    const followUser = async (id: string, friendId: string) =>
    await repository.followUser(id, friendId);

    const unFollowUser= async ( id:string , friendId:string) => 
    await repository.unFollowUser(id,friendId) ;
    
    
    const followersList = async (id: string) =>
    await repository.followersList(id);


    const followingList = async (id: string) =>
    await repository.followingList(id);

    const reportUser = async (id:string,userId:string,reason:string) => 
    await repository.reportUser(id,userId,reason)

    const userSearch = async (name: string) => await repository.userSearch(name);

    
      return {
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
        userSearch
    
      }
    }
    
export type UserDbInterface = typeof userDbRepository;
    