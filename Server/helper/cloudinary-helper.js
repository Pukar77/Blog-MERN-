const cloudinary = require("../config/cloudinary");

//this is used to upload in the cloudinary to make url of an image

const uploadToCloudinary = async (filepath)=>{
try{
    const uploadResult= await cloudinary.uploader.upload(filepath);
    return(
       {
        url:uploadResult.secure_url,
        publicId: uploadResult.public_id
       }
    );



}catch(e){
    console.log("Error", e);
}
}

module.exports = uploadToCloudinary;