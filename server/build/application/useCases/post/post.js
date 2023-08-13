"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReport = exports.postLike = exports.deleteComment = exports.addComment = exports.postEdit = exports.postDelete = exports.getUserPosts = exports.getAllPosts = exports.postCreate = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const postCreate = async (post, repository) => {
    const newPost = await repository.createPost(post);
    if (!newPost) {
        throw new appError_1.default("post not created", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return newPost;
};
exports.postCreate = postCreate;
const getAllPosts = async (repository) => {
    const getPosts = await repository.getAllPosts();
    if (!getPosts) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPosts;
};
exports.getAllPosts = getAllPosts;
const getUserPosts = async (id, repository) => {
    const getPosts = await repository.getUserPosts(id);
    if (!getPosts) {
        throw new appError_1.default("Posts Are not Available", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return getPosts;
};
exports.getUserPosts = getUserPosts;
const postDelete = async (id, repository) => {
    const deletePost = await repository.deletePost(id);
    if (!deletePost) {
        throw new appError_1.default("Post not deleted", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return deletePost;
};
exports.postDelete = postDelete;
const postEdit = async (postId, description, repository) => {
    const editPost = await repository.editPost(postId, description);
    if (!editPost) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return editPost;
};
exports.postEdit = postEdit;
const addComment = async (postId, userId, comment, repository) => {
    const commentAdd = await repository.addComment(postId, userId, comment);
    if (!commentAdd) {
        throw new appError_1.default("comment not added ", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return commentAdd;
};
exports.addComment = addComment;
const deleteComment = async (postId, userId, index, repository) => {
    const deleteComment = await repository.deleteComment(postId, userId, index);
    if (!deleteComment) {
        throw new appError_1.default("Post not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return deleteComment;
};
exports.deleteComment = deleteComment;
const postLike = async (id, loggedId, repository) => {
    const likedPost = await repository.likePost(id, loggedId);
    if (!likedPost) {
        throw new appError_1.default("Post not Found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return likedPost;
};
exports.postLike = postLike;
const postReport = async (postId, userId, reason, repository) => {
    const reportPost = await repository.reportPost(postId, userId, reason);
    if (!reportPost) {
        throw new appError_1.default("Reported Already", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return reportPost;
};
exports.postReport = postReport;
