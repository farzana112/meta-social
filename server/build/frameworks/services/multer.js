"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
// cloudinaryV2.config({
//     cloud_name:configKeys.CLOUD_NAME,
//     cloud_key:configKeys.API_KEY,
//     cloud_secret:configKeys.API_SECRET
// })
cloudinary_1.v2.config({
    cloud_name: 'drpyogc2c',
    api_key: '645652778537936',
    api_secret: 'XgEz5X3xSLJDvWchJGs64xs_3bw'
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: (req, file) => 'uploads',
        resource_type: (req, file) => {
            // Determine the resource type based on the file mimetype
            if (file.mimetype.startsWith('video/')) {
                return 'video';
            }
            return 'auto';
        },
        public_id: (req, file) => {
            const fileName = `${(0, uuid_1.v4)()}-${file.originalname}`;
            return fileName;
        }
    }
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
