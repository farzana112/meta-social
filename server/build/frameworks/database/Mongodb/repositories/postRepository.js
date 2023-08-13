"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryImp = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const postRepositoryImp = () => {
    const createPost = async (post) => {
        const newPost = await new postModel_1.default(post);
        return await newPost.save();
    };
    const getAllPosts = async () => {
        return await postModel_1.default.find().sort({ createdAt: -1 });
    };
    const getUserPosts = async (id) => {
        return await postModel_1.default.find({ userId: id }).sort({ createdAt: -1 });
    };
    const editPost = async (postId, description) => {
        try {
            const updatedPost = await postModel_1.default.findByIdAndUpdate(postId, { description }, { new: true });
            return updatedPost;
        }
        catch (error) {
            console.error(error);
            // Handle error
        }
    };
    const deletePost = async (id) => {
        const postDeleted = await postModel_1.default.findByIdAndDelete({ _id: id });
        return postDeleted;
    };
    const addComment = async (postId, userId, comment) => {
        try {
            const updatedPost = await postModel_1.default.findByIdAndUpdate(postId, { $push: { comments: { userId, comment } } }, { new: true });
            return updatedPost;
        }
        catch (error) {
            console.error(error);
            // Handle error
        }
    };
    const deleteComment = async (postId, userId, index) => {
        try {
            const post = await postModel_1.default.findById(postId);
            if (!post) {
                return;
            }
            post.comments.splice(index, 1);
            await post.save();
            return post;
        }
        catch (error) {
            console.error(error);
        }
    };
    const likePost = async (id, loggedId) => {
        const post = await postModel_1.default.findById({ _id: id });
        if (!post) {
            return;
        }
        if (!post.likes.includes(loggedId)) {
            await post.updateOne({
                $push: {
                    likes: loggedId,
                },
            }, { new: true });
        }
        else {
            await post.updateOne({
                $pull: {
                    likes: loggedId,
                },
            }, { new: true });
        }
        return post;
    };
    const reportPost = async (postId, userId, reason) => {
        try {
            const post = await postModel_1.default.findById(postId);
            const isReported = post.report.some((report) => report.userId === userId);
            if (isReported) {
                return null;
            }
            const updatedPost = await postModel_1.default.findByIdAndUpdate(postId, { $push: { report: { userId, reason } } }, { new: true });
            return updatedPost;
        }
        catch (error) {
            console.error(error);
        }
    };
    return {
        createPost,
        getAllPosts,
        getUserPosts,
        deletePost,
        editPost,
        addComment,
        deleteComment,
        likePost,
        reportPost
    };
};
exports.postRepositoryImp = postRepositoryImp;
