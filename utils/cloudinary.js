import cloudinarys from 'cloudinary';
const cloudinary = cloudinarys.v2;


// cloudinary.config({
//     cloud_name: "dau0f5wzn",
//     api_key: "526381246949595",
//     api_secret: "bmm7VeP5RbmJ4EhykFutGCTMKkw"
// })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary;