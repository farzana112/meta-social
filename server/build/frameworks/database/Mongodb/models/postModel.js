"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 500,
        required: true,
    },
    userName: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [],
    report: [],
    image: [],
}, {
    timestamps: true,
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
