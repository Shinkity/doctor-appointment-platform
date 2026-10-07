const router = require("express").Router();
const { create, forDoctor } = require("../controllers/reviewController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.post("/", protect, allowRoles("patient"), create);
router.get("/doctor/:id", forDoctor);

module.exports = router;
