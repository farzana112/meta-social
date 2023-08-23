"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const nodemailer_1 = require("../../frameworks/services/nodemailer");
const userAuth_1 = require("../../application/useCases/auth/userAuth");
const otpModel_1 = __importDefault(require("../../frameworks/database/Mongodb/models/otpModel"));
const userModel_1 = __importDefault(require("../../frameworks/database/Mongodb/models/userModel"));
const authController = (authServiceInterface, authServieImpl, userDbRepository, userDbRepositoryImpl, adminDbRepository, adminDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServieImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("Hi");
        const { name, userName, email, age, number, password } = req.body;
        console.log(name, age, userName, email, number);
        console.log(req.body);
        const user = {
            name,
            userName,
            email,
            age,
            number,
            password,
        };
        const token = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "new user registered",
            token: token,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.userLogin)(userName, password, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
        });
    });
    const adminLogin = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.adminlogin)(userName, password, dbRepositoryAdmin, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
        });
    });
    const emailSend = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.body;
        const token = await (0, userAuth_1.sendMail)(email, dbRepositoryUser, authService);
        const verifyToken = token.token;
        const userId = token.user._id;
        const otp = (0, nodemailer_1.getMailService)(email, verifyToken, userId);
        const otpDocument = new otpModel_1.default({
            email: email,
            otp: otp,
            token: token.token, // Make sure you have the 'token' value available
        });
        await otpDocument.save();
        const setUserToken = await userModel_1.default.findByIdAndUpdate({ _id: userId }, { verifyToken: verifyToken }, { new: true });
        res.json({
            status: "success",
            otp: otp,
            token,
            verifyToken
        });
    });
    const otpVerify = (0, express_async_handler_1.default)(async (req, res) => {
        const { otp } = req.body;
        console.log("req bdoy ");
        console.log(otp);
        const user = await (0, userAuth_1.verifyOtp)(otp, dbRepositoryUser, authService);
        console.log("user from authcontrolelr");
        console.log(user);
        res.json({
            status: "success",
            otp: otp,
            user
        });
    });
    const googleLoginUser = (0, express_async_handler_1.default)(async (req, res) => {
        // const firstName = req.body?.displayName.split(" ")[0];
        const userName = req.body?.displayName;
        const name = req.body?.displayName;
        const email = req.body?.email;
        const token = await (0, userAuth_1.googleLogin)(userName, name, email, dbRepositoryUser, authService);
        console.log(token);
        res.json({
            status: "success",
            message: "new user registered",
            token: token,
        });
    });
    return {
        registerUser,
        loginUser,
        adminLogin,
        emailSend,
        otpVerify,
        googleLoginUser
    };
};
exports.default = authController;
