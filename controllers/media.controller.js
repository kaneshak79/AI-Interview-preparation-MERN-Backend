import cloudinary from "../config/cloudinary.js";

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
