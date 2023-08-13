"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const otpModel_1 = __importDefault(require("../models/otpModel"));
const userRepositoryMongoDB = () => {
    const addUser = async (user) => {
        const newUser = new userModel_1.default(user);
        return await newUser.save();
    };
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    const getUserByUserName = async (userName) => {
        const user = await userModel_1.default.findOne({ userName });
        return user;
    };
    const getUserByAge = async (age) => {
        const user = await userModel_1.default.findOne({ age });
        return user;
    };
    const getAllUsers = async () => {
        try {
            const users = await userModel_1.default.find();
            return users;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    };
    const userHandle = async (id) => {
        try {
            const user = await userModel_1.default.findOne({ _id: id });
            if (!user) {
                return;
            }
            const newIsBlocked = !user.isBlocked;
            user.isBlocked = newIsBlocked;
            return await user.save();
        }
        catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
        }
    };
    const getUserById = async (id) => {
        try {
            const user = await userModel_1.default.findOne({ _id: id });
            return user;
        }
        catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
        }
    };
    const sendMail = async (email) => {
        try {
            const user = await userModel_1.default.findOne({ email: email });
            return user;
        }
        catch (error) {
            console.error("Error fetching the user with this email id");
            throw error;
        }
    };
    const verifyOtp = async (otp) => {
        try {
            const data = await otpModel_1.default.findOne({ otp: otp });
            if (data) {
                const user = await userModel_1.default.find({ email: data.email });
                otpModel_1.default.deleteMany({ otp: otp });
                return user;
            }
            return;
        }
        catch (error) {
            console.error("Error fetching the user");
            throw error;
        }
    };
    const updateProfile = async (id, user) => {
        const updatedProfile = await userModel_1.default.findByIdAndUpdate(id, user, {
            new: true,
        });
        return updatedProfile;
    };
    const followersList = async (id) => {
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        // Map user.followers to an array of promises
        const followersPromises = user?.followers?.map(async (id) => {
            return await userModel_1.default.findById(id).select("-password");
        });
        // Await the resolution of all promises using Promise.all
        const followers = await Promise.all(followersPromises);
        return followers;
    };
    // const followingList: Function = async (id: string) => {
    //   const user: any = await User.findOne({ _id: id }).select("-password");
    //   console.log("user")
    //   console.log(user)
    //   const following = await Promise.all(
    //     user?.following?.map(
    //       async (id: string) => await User.findById(id).select("-password")
    //     )
    //   );
    //   console.log("following   jfhsfuetyetyeyrtye")
    //   console.log(following)
    //   return following;
    // };
    // adapted
    const followingList = async (id) => {
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        if (!user || !user.following) {
            return []; // Return an empty array if user or user.following is null or undefined
        }
        const following = await Promise.all(user?.following?.map(async (id) => await userModel_1.default.findById(id).select("-password")));
        return following;
    };
    //   const followUser = async (id: string, friendId: string) => {
    //     const followingUser: any = await User.findOne({ _id: id });
    //     const follow: any = await User.findOne({ _id: friendId });
    //     if (!follow?.followers?.includes(id)) {
    //       await followingUser?.updateOne(
    //         {
    //           $push: {
    //             following: friendId,
    //           },
    //         },
    //         { new: true }
    //       );
    //       await follow?.updateOne(
    //         {
    //           $push: {
    //             followers: id,
    //           },
    //         },
    //         { new: true }
    //       );
    //     } else {
    //       await followingUser.updateOne(
    //         {
    //           $pull: {
    //             following: friendId,
    //           },
    //         },
    //         { new: true }
    //       );
    //       await follow.updateOne(
    //         {
    //           $pull: {
    //             followers: id,
    //           },
    //         },
    //         { new: true }
    //       );
    //     }
    //     const user: any = await User.findOne({ _id: id }).select("-password");
    //     const following = await Promise.all(
    //       user.following?.map(
    //         async (id: string) => await User.findById(id).select("-password")
    //       )
    //     );
    // console.log("following")
    // console.log(following)
    //     const followers = await Promise.all(
    //       user.followers?.map(
    //         async (id: string) => await User.findById(id).select("-password")
    //       )
    //     );
    //     console.log( "!!!!!!!!!!")
    //     console.log(followers)
    //     return { following, followers };
    //   };
    const followUser = async (id, friendId) => {
        const followingUser = await userModel_1.default.findOne({ _id: id });
        const follow = await userModel_1.default.findOne({ _id: friendId });
        if (!follow?.followers?.includes(id)) {
            await followingUser?.updateOne({
                $push: {
                    following: friendId,
                },
            }, { new: true });
            await follow?.updateOne({
                $push: {
                    followers: id,
                },
            }, { new: true });
        }
        else {
            await followingUser?.updateOne({
                $pull: {
                    following: friendId,
                },
            }, { new: true });
            await follow?.updateOne({
                $pull: {
                    followers: id,
                },
            }, { new: true });
        }
        const user = await userModel_1.default.findOne({ _id: id }).select("-password");
        const following = await Promise.all((user.following || []).map(async (id) => await userModel_1.default.findById(id).select("-password")));
        const followers = await Promise.all((user.followers || []).map(async (id) => await userModel_1.default.findById(id).select("-password")));
        return { following, followers };
    };
    const unFollowUser = async (id, friendId) => {
        let followingUser = await userModel_1.default.findOne({ _id: id });
        let follow = await userModel_1.default.findOne({ _id: friendId });
        if (followingUser?.following?.includes(friendId)) {
            await followingUser.updateOne({
                $pull: {
                    following: friendId,
                },
            }, { new: true });
            await follow?.updateOne({
                $pull: {
                    followers: id,
                },
            }, { new: true });
        }
        else {
            return null;
        }
        followingUser = await userModel_1.default.findOne({ _id: id });
        follow = await userModel_1.default.findOne({ _id: friendId });
        return {
            follow,
            followingUser,
        };
    };
    const reportUser = async (id, userId, reason) => {
        try {
            const user = await userModel_1.default.findById(id);
            const isReported = user.report.some((report) => report.userId === userId);
            if (isReported) {
                return null;
            }
            user.report.push({ userId, reason });
            await user.save();
            return user;
        }
        catch (error) {
            console.error(error);
        }
    };
    const userSearch = async (name) => {
        const user = await userModel_1.default.find({
            name: { $regex: `^${name}`, $options: "i" },
        });
        return user;
    };
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
exports.userRepositoryMongoDB = userRepositoryMongoDB;
