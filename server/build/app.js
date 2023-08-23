"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const crypto_1 = require("crypto");
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
dotenv_1.default.config();
const Connection_1 = __importDefault(require("./frameworks/database/Mongodb/Connection/Connection"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./frameworks/webSocket/socket"));
// import cookieParser from 'cookie-parser'
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const jwtSecret = (0, crypto_1.randomBytes)(32).toString('hex');
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['*'],
        methods: ["GET", "POST"]
    }
});
console.log("socket config");
(0, socket_1.default)(io);
//   database connection
(0, Connection_1.default)();
// express configuration
(0, express_2.default)(app);
(0, routes_1.default)(app);
app.use(errorHandlingMiddleware_1.default);
(0, server_1.default)(server).startServer();
