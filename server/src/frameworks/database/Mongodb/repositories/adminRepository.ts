import Admin from "../models/adminModel"
export const adminRepositoryMongoDB=()=>{
    const getAdminByUserName = async (userName: string) => {
        const admin: any = await Admin.findOne({ userName });
        
        return admin;
      };
      


return {
   
    getAdminByUserName,
   
   
  };
};

export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;
