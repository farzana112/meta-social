import express from "express";
import messageController from "../../../adapters/controllers/messageControllers";
import { messageDbInterface } from "../../../application/repositories/messageDbRepositoryInterface"; 
import { messageRepositoryImp } from "../../database/Mongodb/repositories/messagerepository"; 


const messageRouter = () => {
  const router = express.Router();
  const controller = messageController(messageDbInterface, messageRepositoryImp);
  router.post('/', controller.addMessage);

router.get('/:chatId', controller.getMessages);

  return router;
};
export default messageRouter;
