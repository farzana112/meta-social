import User from "../models/userModel";
export const userRepositoryMongoDB = () => {
    const addUser = async (user: {
        name: string;
        userName: string;
        email: string;
        age:number;
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
      

return{
  addUser,
  getUserByEmail,
  getUserByUserName,
  getUserByAge,
  getAllUsers,
  userHandle,
  getUserById
  


}
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
