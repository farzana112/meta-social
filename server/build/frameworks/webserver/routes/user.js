"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../../../adapters/controllers/userControllers"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const multer_1 = require("../../services/multer");
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userControllers_1.default)(userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.get("/search", authMiddleware_1.default, controller.searchUser);
    router.get("/getUsers", controller.getAllUsers);
    router.put("/:id/userHandle", controller.handleUser);
    router.get("/:id", authMiddleware_1.default, controller.getUserById);
    router.put("/:id/updateProfile", multer_1.upload.single("picture"), controller.updateProfile);
    router.put("/:friendId/follow", authMiddleware_1.default, controller.putFollowUser);
    router.put("/:friendId/unFollow", authMiddleware_1.default, controller.putUnFollowUser);
    router.get("/:id/followers", authMiddleware_1.default, controller.getUserFriends);
    router.get("/:id/following", authMiddleware_1.default, controller.getUserFollowing);
    router.put("/:id/report", authMiddleware_1.default, controller.reportUser);
    return router;
};
exports.default = userRouter;
