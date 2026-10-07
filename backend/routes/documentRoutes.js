const router = require("express").Router();
const { upload: uploadDoc, list, remove } = require("../controllers/documentController");
const { upload } = require("../middlewares/uploadMiddleware");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.use(protect, allowRoles("patient"));
router.post("/upload", upload.single("file"), uploadDoc);
router.get("/", list);
router.delete("/:id", remove);

module.exports = router;
