// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// 🔥 LOAD ENV HERE (THIS FIXES YOUR ERROR)
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ✅ DEBUG (remove later)
console.log("Cloud:", process.env.CLOUD_NAME);
console.log("Key:", process.env.CLOUD_API_KEY);

export default cloudinary;