"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => await repository.getUserByEmail(email);
    const getUserByUserName = async (userName) => await repository.getUserByUserName(userName);
    const getUserByAge = async (age) => await repository.getUserByAge(age);
    const getAllUsers = async () => await repository.getAllUsers();
    const userHandle = async (id) => await repository.userHandle(id);
    const getUserById = async (id) => await repository.getUserById(id);
    const sendMail = async (email) => await repository.sendMail(email);
    const verifyOtp = async (otp) => await repository.verifyOtp(otp);
    const updateProfile = async (id, user) => await repository.updateProfile(id, user);
    const followUser = async (id, friendId) => await repository.followUser(id, friendId);
    const unFollowUser = async (id, friendId) => await repository.unFollowUser(id, friendId);
    const followersList = async (id) => await repository.followersList(id);
    const followingList = async (id) => await repository.followingList(id);
    const reportUser = async (id, userId, reason) => await repository.reportUser(id, userId, reason);
    const userSearch = async (name) => await repository.userSearch(name);
    return {
        addUser,
        getUserByEmail,
        getUserByUserName,
        getUserByAge,
        getAllUsers,
        userHandle,
        getUserById,
        sendMail,
        updateProfile,
        followUser,
        unFollowUser,
        followersList,
        followingList,
        reportUser,
        userSearch,
        verifyOtp
    };
};
exports.userDbRepository = userDbRepository;
