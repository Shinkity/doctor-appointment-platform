const router = require("express").Router();
const { pendingDoctors, verifyDoctor, stats } = require("../controllers/adminController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.use(protect, allowRoles("admin"));
router.get("/pending-doctors", pendingDoctors);
router.put("/verify-doctor", verifyDoctor);
router.get("/stats", stats);

module.exports = router;
