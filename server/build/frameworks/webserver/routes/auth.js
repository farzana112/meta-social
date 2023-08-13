"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../../../adapters/controllers/authControllers"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServicInterface_1 = require("../../../application/services/authServicInterface");
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const authservices_1 = require("../../services/authservices");
const adminRepository_1 = require("../../database/Mongodb/repositories/adminRepository");
const adminDbRepository_1 = require("../../../application/repositories/adminDbRepository");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authControllers_1.default)(authServicInterface_1.authServiceInterface, authservices_1.authService, userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB, adminDbRepository_1.adminDbRepository, adminRepository_1.adminRepositoryMongoDB);
    router.post("/register", controller.registerUser);
    router.post("/login", controller.loginUser);
    router.post('/adminLogin', controller.adminLogin);
    router.post('/send-email', controller.emailSend);
    router.post("/verify-otp", controller.otpVerify);
    router.post('/googleLogin', controller.googleLoginUser);
    return router;
};
exports.default = authRouter;
