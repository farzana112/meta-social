"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../../config"));
const connectDB = async () => {
    try {
        console.log(config_1.default.PORT);
        if (!config_1.default.MONGO_URI) {
            throw new Error('MongoDB connection URI not found in environment variables.');
        }
        const conn = await mongoose_1.default.connect(config_1.default.MONGO_URI);
        console.log('\x1b[42m%s\x1b[0m', `MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
