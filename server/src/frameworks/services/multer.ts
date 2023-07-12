import cloudinary from "cloudinary"
import { v4 as uuidv4 } from 'uuid';
import multer from "multer"
import { v2 as cloudinaryV2} from 'cloudinary'
import configKeys from "../../config"
import { CloudinaryStorage } from 'multer-storage-cloudinary';




// cloudinaryV2.config({
//     cloud_name:configKeys.CLOUD_NAME,
//     cloud_key:configKeys.API_KEY,
//     cloud_secret:configKeys.API_SECRET
// })

cloudinaryV2.config({ 
  cloud_name: 'drpyogc2c', 
  api_key: '645652778537936', 
  api_secret: 'XgEz5X3xSLJDvWchJGs64xs_3bw' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params: {
      folder: (req: any, file: any) => 'uploads', // Specify the folder in Cloudinary where you want to store the files
      resource_type: (req: any, file: any) => {
        // Determine the resource type based on the file mimetype
        if (file.mimetype.startsWith('video/')) {
          return 'video';
        }
        return 'auto';
      },
      public_id: (req: Express.Request, file: Express.Multer.File) => {
        const fileName = `${uuidv4()}-${file.originalname}`;
        return fileName;
      }
    } as any
  })

  const upload = multer({ storage });

export { upload };

  