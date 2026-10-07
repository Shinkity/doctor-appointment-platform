const router = require("express").Router();
const c = require("../controllers/appointmentController");
const { protect, allowRoles } = require("../middlewares/authMiddleware");

router.use(protect);
router.post("/book", allowRoles("patient"), c.book);
router.get("/my-appointments", c.myAppointments);
router.put("/:id/reschedule", c.reschedule);
router.put("/:id/cancel", c.cancel);
router.put("/:id/complete", allowRoles("doctor"), c.complete);
router.get("/:id/calendar", c.calendarFile);

module.exports = router;
