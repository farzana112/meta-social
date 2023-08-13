"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDbInterface = void 0;
const postDbInterface = (repository) => {
    const createPost = async (post) => await repository.createPost(post);
    const getAllPosts = async () => await repository.getAllPosts();
    const getUserPosts = async (id) => await repository.getUserPosts(id);
    const deletePost = async (id) => await repository.deletePost(id);
    const editPost = async (postId, description) => await repository.editPost(postId, description);
    const addComment = async (postId, userId, comment) => await repository.addComment(postId, userId, comment);
    const deleteComment = async (postId, userId, index) => await repository.deleteComment(postId, userId, index);
    const likePost = async (id, loggedId) => await repository.likePost(id, loggedId);
    const reportPost = async (postId, userId, reason) => await repository.reportPost(postId, userId, reason);
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
exports.postDbInterface = postDbInterface;
