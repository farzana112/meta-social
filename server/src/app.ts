import express,{Application} from "express"
import dotenv from "dotenv"
import http from "http"
import serverConfig from './frameworks/webserver/server';
import expressConfig from "./frameworks/webserver/express";
import routes from './frameworks/webserver/routes';
import { randomBytes } from 'crypto';
import errorHandlingMidlleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
dotenv.config()
import connectDB from './frameworks/database/Mongodb/Connection/Connection';
import { Server } from 'socket.io';
import socketConfig from "./frameworks/webSocket/socket";

// import cookieParser from 'cookie-parser'

const port=process.env.PORT || 5000
const app:Application= express();
const server = http.createServer(app);
const jwtSecret = randomBytes(32).toString('hex');


const io = new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:["GET","POST"]
    }
});


socketConfig(io)    

//   database connection
connectDB()

// express configuration

expressConfig(app)
 routes(app)
app.use(errorHandlingMidlleware)

serverConfig(server).startServer()

