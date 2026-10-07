// Multer reads the file into memory, then we send it to Cloudinary
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "auto" }, (err, result) =>
      err ? reject(err) : resolve(result)
    );
    stream.end(buffer);
  });

module.exports = { upload, uploadToCloudinary };
