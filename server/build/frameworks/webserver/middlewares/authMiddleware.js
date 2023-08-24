"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const authservices_1 = require("../../services/authservices");
const userAuthMiddleware = (req, res, next) => {
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        console.log("no token");
        throw new appError_1.default("Token not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    try {
        console.log(token);
        const { payload } = (0, authservices_1.authService)().verifyToken(token);
        console.log("payload");
        console.log(payload);
        next();
    }
    catch (err) {
        console.log(err);
        throw new appError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.default = userAuthMiddleware;
