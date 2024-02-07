import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.envCLOUD_SECRET
});


const uploadOnCloudinary =async (localFilePath)=>{
    try {
        if(!localFilePath) return null;

        const response = cloudinary.uploader.upload(localFilePath,{
            resource_type : 'auto',
        },function(error,result){console.log(result);})
        return response;

        
    } catch (error) {
        fs.unlink(localFilePath);
        // locally saved tempory file is unlink from the fs beacuse they are not uploaded on cloudinary
        // that means there may be error in file so we need to unlink the file from your server to make it clean....

    }

}

export { uploadOnCloudinary };
