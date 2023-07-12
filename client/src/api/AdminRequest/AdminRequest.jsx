import API from "../instance";
export const adminLogin = async (formData, onSubmitProps, handleToast) => {
  try {
    const response = await API.post("/api/auth/adminLogin", formData);
    if (response && response.data) {
      return response.data;
    } else {
      // Handle unexpected response structure
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    // Handle error
    handleToast(error.response?.data?.message || "An error occurred", "error");

    console.error(error);
    throw error;
  }
};


  export const getAllUsers = async () => {
    try {
      const response = await API.get("/api/user/getUsers");
      return response.data.users;
    } catch (error) {
      // Handle error
      // handleToast(error.response.data.message, "error");
  
      console.error(error.response.data.message);
      throw error;
    }
  };

  export const userHandle = async (userId) => {
    
    try {
      const response = await API.put(`/api/user/${userId}/userHandle`);
    return response.data.isBlocked;
    } catch (error) {
      
      console.error(error.response.data.message);
      throw error;
    }
  };