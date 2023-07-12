import mongoose, { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    
    userName: {
      type: String,
      required: true,
      

    },
    email: {
      type: String,
      
    },
    
    password: {
      type: String,

    },
    
    
    
    
    
    
   
   

    
  }, { timestamps: true }
  
);

const Admin = model("Admin", adminSchema);

export default Admin;
