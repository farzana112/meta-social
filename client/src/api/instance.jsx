import axios from "axios";
import { parseCookies} from "cookie"

const instance = axios.create({
  baseURL: "http://metasocial.cloud",
  // Add any other default configuration options you need
});


instance.interceptors.request.use(
  (config) => {
    const reduxState = localStorage.getItem("reduxState"); // Retrieve the token from storage
  const state=  JSON.parse(reduxState)
  const token= state?.payload?.token?.token
  console.log("token !!"+token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export default instance;