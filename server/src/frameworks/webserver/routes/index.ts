import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user"
import postRouter from "./post"
import chatRouter from "./chat"
import messageRouter from "./message"
import userAuthMiddleware from "../middlewares/authMiddleware"

const routes=(app:Application)=>{
    app.use("/api/auth", authRouter());
    app.use("/api/user",userRouter())
    app.use("/api/post",userAuthMiddleware,postRouter())
    app.use("/api/chat",userAuthMiddleware,chatRouter())
    app.use("/api/message",userAuthMiddleware, messageRouter());


}

export default routes