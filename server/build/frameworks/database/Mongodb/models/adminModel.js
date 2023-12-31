"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
}, { timestamps: true });
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
