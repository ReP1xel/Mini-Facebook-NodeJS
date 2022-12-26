const cloudinary = require("cloudinary");
const credentials = require('../credentials')
cloudinary.config({
    cloud_name: credentials.cloud_name,
    api_key: credentials.api_key,
    api_secret: credentials.api_secret
});
async function upload_file(file) {
    let result = await cloudinary.uploader.upload(file.path);
    return result.secure_url
}
module.exports = upload_file;