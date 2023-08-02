import mongoose, { Schema, model } from "mongoose";


const otpSchema = new Schema(
    {
    email: {
        type: String,
        required: true,
        
      },
      otp:{
        type:Number
      },
     
      token: {
        type:String,
        expires:30
      }
      
    })

    const Otp=model("Otp",otpSchema)

    export default Otp
    