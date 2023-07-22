import API from "../instance";

export const getAUser = async (userId,token) => {
    try {
        if(userId){
      const response = await API.get(`/api/user/${userId}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("token",token)
      const data=response.data.user
      return data
      
        }
    } catch (error) {
      
      console.error(error.response.data.message);
      throw error;
    }
  };

  export const followReq = async (id, friendId, token) => {
    try {
      console.log("response from followReq")
      const response = await API.put(
        `api/user/${friendId}/follow`,
        { id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.data.result;
      console.log(data)
      return data;
    } catch (error) {
      // Handle error
      console.error("Error fetching user:", error);
      throw error;
    }
  };


  export const unFollowReq = async (id, friendId, token) => {
    try {
      console.log("response from unfollowReq")
      const response = await API.put(
        `api/user/${friendId}/unFollow`,
        { id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response)
      const data = await response.data.result;
      console.log(data)
      return data;
    } catch (error) {
      // Handle error
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  export const getFollowers = async (userId, token) => {
    try {

      const response = await API.get(`api/user/${userId}/followers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("foem the try block");
      console.log(response)
      const data = await response.data;
      return data.followers;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  export const getFollowing = async (userId, token) => {
    try {
      console.log("getFollowing")
      const response = await API.get(`api/user/${userId}/following`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      return data.following;
    } catch (error) {
      console.error( error);
      throw error;
    }
  };


  export const updateProfile = async (userId, token, formData) => {
    try {
      const response = await API.put(
        `api/user/${userId}/updateProfile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.data.updatedProfile;
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };


  export const reportUser = async (loggedUserId, id, reason, token) => {
    try {
      const response = await API.put(
        `api/user/${id}/report`,
        { userId: loggedUserId, reason: reason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data.reportedUser;
      return data;
    } catch (error) {
      // Handle error
      console.error("Error getting user posts:", error);
      throw error;
    }
  };


  export const userSearch = async (name, token) => {
    try {
      const response = await API.get(`api/user/search`, {
        params: { name },
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data.result;
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  