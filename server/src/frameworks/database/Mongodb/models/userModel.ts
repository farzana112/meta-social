import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,

    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    number: {
        type: Number,
       
        // unique: true,
    },
    password: {
      type: String,

    },
    displayPicture: {
      type: String,
    },
    about: {
      type: String,
    },
    age: {
        type: Number,
        required: true,
        min: 18, // Minimum value for age
      },
    location: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    
    isBlocked: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    verifyToken:{
      type:String
    },
   

    report:[]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
