"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatControllers_1 = __importDefault(require("../../../adapters/controllers/chatControllers"));
const chatDbRepositoryInterface_1 = require("../../../application/repositories/chatDbRepositoryInterface");
const chatRepository_1 = require("../../database/Mongodb/repositories/chatRepository");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, chatControllers_1.default)(chatDbRepositoryInterface_1.chatDbInterface, chatRepository_1.chatRepositoryImp);
    router.post("/", controller.createChat);
    router.get("/:userId", controller.userChats);
    router.get("/find/:firstId/:secondId", controller.findChat);
    return router;
};
exports.default = chatRouter;
