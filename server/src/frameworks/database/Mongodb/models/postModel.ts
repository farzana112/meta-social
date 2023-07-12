import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max:500,
      required: true,
    },
    userName: {
      type: String,
    },
    likes: {
        type:Array,
        default:[]
    },
    comments: [],
    report:[],

    image: [],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

export default Post;
