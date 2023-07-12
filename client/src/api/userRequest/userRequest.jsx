import API from "../instance";

export const getAUser = async (userId,token) => {
    try {
        if(userId){
      const response = await API.get(`/api/user/${userId}`);
      localStorage.setItem("token",token)
      const data=response.data.user
      return data
      
        }
    } catch (error) {
      
      console.error(error.response.data.message);
      throw error;
    }
  };