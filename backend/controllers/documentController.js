// Upload, view and delete medical documents
const Document = require("../models/Document");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../middlewares/uploadMiddleware");

const upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please choose a file" });
    const file = await uploadToCloudinary(req.file.buffer, "medical-docs");
    const doc = await Document.create(req.user.id, req.file.originalname, file.secure_url, file.public_id);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

const list = async (req, res) => {
  try {
    res.json(await Document.listForPatient(req.user.id));
  } catch (err) {
    res.status(500).json({ message: "Could not load documents" });
  }
};

const remove = async (req, res) => {
  try {
    const doc = await Document.findOwned(req.params.id, req.user.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    await cloudinary.uploader.destroy(doc.public_id, { resource_type: "raw" }).catch(() => {});
    await Document.remove(doc.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete document" });
  }
};

module.exports = { upload, list, remove };
