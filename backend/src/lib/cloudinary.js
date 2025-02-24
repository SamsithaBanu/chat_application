import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

console.log('process', process.env.CLOUDINARY_CLOUD_NAME)
console.log('process1', process.env.CLOUDINARY_API_KEY)
console.log('process2', process.env.CLOUDINARY_API_SECRET)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // ✅ Correct variable name
  api_key: process.env.CLOUDINARY_API_KEY, // ✅ Correct variable name
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ Correct variable name
});

export default cloudinary;