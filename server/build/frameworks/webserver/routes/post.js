"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postControllers_1 = __importDefault(require("../../../adapters/controllers/postControllers"));
const postDbRepositoryInterface_1 = require("../../../application/repositories/postDbRepositoryInterface");
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const postRepository_1 = require("../../database/Mongodb/repositories/postRepository");
const userRepository_1 = require("../../database/Mongodb/repositories/userRepository");
const multer_1 = require("../../services/multer");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const postRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, postControllers_1.default)(postDbRepositoryInterface_1.postDbInterface, postRepository_1.postRepositoryImp, userDbRepository_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.post("/", multer_1.upload.array('picture', 4), controller.createPost);
    router.get("/", authMiddleware_1.default, controller.getPosts);
    router.get("/:userId", authMiddleware_1.default, controller.getUserPost);
    router.delete('/:id', controller.deletePost);
    router.put("/:postId", controller.editPost);
    router.put("/:postId/comment", controller.commentPost);
    router.put("/:postId/commentDelete", controller.commentDelete);
    router.put('/:id/like', controller.likePost);
    router.put("/:postId/report", controller.reportPost);
    return router;
};
exports.default = postRouter;
