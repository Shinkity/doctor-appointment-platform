const router = require("express").Router();
const { getProfile, updateProfile, getHistory } = require("../controllers/patientController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.use(protect, allowRoles("patient"));
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/history", getHistory);

module.exports = router;
