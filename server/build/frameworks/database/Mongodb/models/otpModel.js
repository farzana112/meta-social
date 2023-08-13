"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number
    },
    token: {
        type: String,
        expires: 30
    }
});
const Otp = (0, mongoose_1.model)("Otp", otpSchema);
exports.default = Otp;
