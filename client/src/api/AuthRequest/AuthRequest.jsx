import API from "../instance";

export const register = async (formData, onSubmitProps, handleToast) => {
  try {
    const response = await API.post("/api/auth/register", formData);
    
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error creating post:", error);
    handleToast(error.response.data.message, "error");
    throw error;
  }
};

export const login = async (formData, onSubmitProps, handleToast) => {
  try {  
     
    const response = await API.post("/api/auth/login", formData);
    console.log(response.data)

    return response.data;
  } catch (error) {
    // Handle error
    handleToast(error.response.data.message, "error");

    console.error(error.response.data.message);
    throw error;
  }
};


export const sendMail = async (formData, onSubmitProps, handleToast) => {
  try {
    const response = await API.post("/api/auth/send-email", formData);
   
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);
    if (error.response && error.response.status === 401) {
      // If the error response has a status code of 401, it means the email is invalid
      handleToast(error.response.data.message, "error");
     
    } else {
      // For other errors, show a generic error message
      handleToast("Something went wrong", "error");
      
    }
   
  }
};


export const verifyOtp= async( formData, onSubmitProps , handleToast) => {
  try {
    const response = await API.post("/api/auth/verify-otp", formData);
   
    return response.data;
  } catch(error) {
   console.error(error)
  }
}


export const googleLogin = async (formData,handleToast) => {
  try {
    const response = await API.post("/api/auth/googleLogin", formData);
    return response.data;
  } catch (error) {
    // Handle error
    handleToast(error.response.data.message, "error");

    console.error(error.response.data.message);
    throw error;
  }
}
