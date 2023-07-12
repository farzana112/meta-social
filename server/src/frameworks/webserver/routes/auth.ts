import express from "express"
import authController from "../../../adapters/controllers/authControllers"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { authServiceInterface } from "../../../application/services/authServicInterface";
import { userRepositoryMongoDB } from "../../database/Mongodb/repositories/userRepository";
import {  authService } from "../../services/authservices";
import { adminRepositoryMongoDB } from "../../database/Mongodb/repositories/adminRepository";
import { adminDbRepository } from "../../../application/repositories/adminDbRepository"
const authRouter=()=>{
    const router=express.Router();
    const controller=authController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongoDB,
        adminDbRepository,
        adminRepositoryMongoDB


    )
    router.post("/register",controller.registerUser)
     router.post("/login",controller.loginUser)
     router.post('/adminLogin',controller.adminLogin)
    return router
}


export default authRouter