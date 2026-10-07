const router = require("express").Router();
const { getDoctors, getDoctorById, updateProfile } = require("../controllers/doctorController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.get("/", getDoctors);
router.put("/profile", protect, allowRoles("doctor"), updateProfile);
router.get("/:id", getDoctorById);

module.exports = router;
