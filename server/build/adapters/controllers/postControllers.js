"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../application/useCases/post/post");
const postController = (postDbInterface, postDbImp, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryPost = postDbInterface(postDbImp());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const createPost = (0, express_async_handler_1.default)(async (req, res) => {
        const image = [];
        const { userId, description, userName } = req.body;
        const files = req?.files;
        for (const file of files) {
            const picture = file.path;
            image.push(picture);
        }
        const post = { userId, description, image, userName };
        const newPost = await (0, post_1.postCreate)(post, dbRepositoryPost);
        res.json({
            status: "success",
            newPost,
        });
    });
    const getPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const posts = await (0, post_1.getAllPosts)(dbRepositoryPost);
        res.json({
            status: "success",
            posts
        });
    });
    const getUserPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const posts = await (0, post_1.getUserPosts)(userId, dbRepositoryPost);
        res.json({
            status: "success",
            posts
        });
    });
    const deletePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const post = await (0, post_1.postDelete)(id, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully post deleted",
            post
        });
    });
    const editPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { description } = req.body;
        const editedPost = await (0, post_1.postEdit)(postId, description, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Post Edited ",
            editedPost
        });
    });
    const commentPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, comment } = req.body;
        const commentAdded = await (0, post_1.addComment)(postId, userId, comment, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully commentAdded",
            commentAdded
        });
    });
    const commentDelete = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, index } = req.body;
        const deletedComment = await (0, post_1.deleteComment)(postId, userId, index, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Comment Deleted",
            deletedComment
        });
    });
    const likePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const { loggedId } = req.body;
        const likedPost = await (0, post_1.postLike)(id, loggedId, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully liked",
            likedPost
        });
    });
    const reportPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        const { userId, reason } = req.body;
        const reportedPost = await (0, post_1.postReport)(postId, userId, reason, dbRepositoryPost);
        res.json({
            status: "success",
            message: "Successfully report",
            reportedPost
        });
    });
    return {
        createPost,
        getPosts,
        getUserPost,
        deletePost,
        editPost,
        commentPost,
        commentDelete,
        likePost,
        reportPost
    };
};
exports.default = postController;
