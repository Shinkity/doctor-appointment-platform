const router = require("express").Router();
const { registerPatient, registerDoctor, login } = require("../controllers/authController");
const { upload } = require("../middlewares/uploadMiddleware");

router.post("/register-patient", registerPatient);
router.post("/register-doctor", upload.single("license"), registerDoctor);
router.post("/login", login);

module.exports = router;
