import cloudinary from "../config/cloudinary.js";

// export const uploadFile = async (req, res) => {
//   try {
//     if (!req.files || !req.files.file)
//       return res.status(400).json({ msg: "No file uploaded" });

//     const file = req.files.file;

//     // upload to cloudinary
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "ai-interview"
//     });

//     res.json({
//       url: result.secure_url
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const uploadFile = async (req, res) => {
//   try {
//     console.log("FILES:", req.files); // DEBUG

//     if (!req.files || !req.files.file) {
//       return res.status(400).json({ msg: "No file uploaded" });
//     }

//     const file = req.files.file;

//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "ai-interview"
//     });

//     res.json({ url: result.secure_url });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

export const uploadFile = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;

    console.log("PATH:", file.tempFilePath); // DEBUG

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "ai-interview"
    });

    res.json({ url: result.secure_url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};