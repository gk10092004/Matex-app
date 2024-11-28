require('dotenv').config();
const cloudinary = require("cloudinary").v2;
const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const uploadOnCloudinary = async(localFilePath) => {
    try {
        //check karo ki hai ki nahi
        if(!localFilePath) return null;
        //upload karo file
        const reponse = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            // upload_preset:'unsigned_upload',
            folder:'PIE_PROJECT',

        });
        fs.unlinkSync(localFilePath); // remove temp file after upload
        //file uploaded successfully
        // console.log("file is uploaded on cloud",reponse.secure_url)
        return reponse.secure_url;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath) //for remove tempory local file if upload failed
        }
        return "error in cloudinary";
    }
}

module.exports = {
    uploadOnCloudinary,
};
