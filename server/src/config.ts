import dotenv from "dotenv"
 dotenv.config();
 const configKeys = {
    
    PORT: process.env.PORT,
    MONGO_URI:process.env.MONGO_URI as string,
    JWT_SECRET:process.env.JWT_SECRET as string,
   CLOUD_NAME:process.env.CLOUD_NAME as string,
   API_KEY:process.env.API_KEY as string,
   API_SECRET:process.env.API_SECRET as string,
   EMAIL:process.env.EMAIL as string,
   PASSWORD:process.env.PASSWORD as string
 }
 
 export default configKeys
 