"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageControllers_1 = __importDefault(require("../../../adapters/controllers/messageControllers"));
const messageDbRepositoryInterface_1 = require("../../../application/repositories/messageDbRepositoryInterface");
const messagerepository_1 = require("../../database/Mongodb/repositories/messagerepository");
const messageRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, messageControllers_1.default)(messageDbRepositoryInterface_1.messageDbInterface, messagerepository_1.messageRepositoryImp);
    router.post('/', controller.addMessage);
    router.get('/:chatId', controller.getMessages);
    return router;
};
exports.default = messageRouter;
