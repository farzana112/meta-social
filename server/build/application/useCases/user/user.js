"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSearch = exports.userReport = exports.followingList = exports.followersList = exports.unFollowUser = exports.followUser = exports.profileUpdate = exports.getAUser = exports.userHandle = exports.allUsers = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const allUsers = async (repository) => {
    const users = await repository.getAllUsers();
    if (!users) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return users;
};
exports.allUsers = allUsers;
const userHandle = async (id, repository) => {
    const result = await repository.userHandle(id);
    if (!result) {
        throw new appError_1.default("Cannot find User", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    return result;
};
exports.userHandle = userHandle;
const getAUser = async (id, repository) => {
    const result = await repository.getUserById(id);
    if (!result) {
        throw new appError_1.default("Cannot find User", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    return result;
};
exports.getAUser = getAUser;
const profileUpdate = async (id, user, repository) => {
    const updateProfile = await repository.updateProfile(id, user);
    if (!updateProfile) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return updateProfile;
};
exports.profileUpdate = profileUpdate;
const followUser = async (id, friendId, repository) => {
    const result = await repository.followUser(id, friendId);
    console.log(result);
    if (!result) {
        throw new appError_1.default("user is already followed", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    return result;
};
exports.followUser = followUser;
const unFollowUser = async (id, friendId, repository) => {
    const result = await repository.unFollowUser(id, friendId);
    if (!result) {
        throw new appError_1.default("user is already unfollowed", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    return result;
};
exports.unFollowUser = unFollowUser;
const followersList = async (id, repository) => {
    const followers = await repository.followersList(id);
    return followers;
};
exports.followersList = followersList;
const followingList = async (id, repository) => {
    const followers = await repository.followingList(id);
    return followers;
};
exports.followingList = followingList;
const userReport = async (id, userId, reason, repository) => {
    const reportUser = await repository.reportUser(id, userId, reason);
    if (!reportUser) {
        throw new appError_1.default("Reported Already", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return reportUser;
};
exports.userReport = userReport;
const userSearch = async (name, repository) => {
    const result = await repository.userSearch(name);
    if (!result) {
        throw new appError_1.default("user is already followed", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    return result;
};
exports.userSearch = userSearch;
