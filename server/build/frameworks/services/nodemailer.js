"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailService = void 0;
const config_1 = __importDefault(require("../../config"));
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const getMailService = (userEmail, verifyToken, userId) => {
    let config = {
        service: "gmail",
        auth: {
            user: config_1.default.EMAIL,
            pass: config_1.default.PASSWORD
        }
    };
    const generateOTP = () => {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };
    let MailGenerator = new mailgen_1.default({
        theme: "default",
        product: {
            name: "Meta-Social",
            link: 'https://mailgen.js/'
        }
    });
    let otp = generateOTP();
    let response = {
        body: {
            name: "Friend",
            intro: "Your link To reset the password is",
            table: {
                data: [
                    {
                        // link:`http://localhost:5173/reset-password/${userId}/${verifyToken}`
                        // text:`This Link Valid For 2 MINUTES http://localhost:5000/reset-password/${userId}/${verifyToken}`
                        link: "This Link Valid For 2 MINUTES http://localhost:5173/reset-password/" + userId + "/" + verifyToken
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    };
    let mail = MailGenerator.generate(response);
    const transporter = nodemailer_1.default.createTransport(config);
    let message = {
        from: config_1.default.EMAIL,
        to: userEmail,
        subject: "Password Reset",
        html: mail
    };
    transporter.sendMail(message).then(() => {
        return message;
    });
    return otp;
};
exports.getMailService = getMailService;
