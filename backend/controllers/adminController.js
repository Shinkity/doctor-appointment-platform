// Verify or reject doctors, platform numbers
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const pendingDoctors = async (req, res) => {
  try {
    res.json(await User.pendingDoctors());
  } catch (err) {
    res.status(500).json({ message: "Could not load doctors" });
  }
};

const verifyDoctor = async (req, res) => {
  try {
    const { doctorId, approve } = req.body;
    const doctor = await User.getEmail(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    if (approve) {
      await User.setVerified(doctorId);
      sendEmail(doctor.email, "Account approved", `Hello ${doctor.name}, your account is approved. You can log in now.`);
    } else {
      await User.deleteUser(doctorId);
      sendEmail(doctor.email, "Account not approved", `Hello ${doctor.name}, we could not verify your licence.`);
    }
    res.json({ message: approve ? "Doctor approved" : "Doctor rejected" });
  } catch (err) {
    res.status(500).json({ message: "Could not update doctor" });
  }
};

const stats = async (req, res) => {
  try {
    res.json(await User.stats());
  } catch (err) {
    res.status(500).json({ message: "Could not load numbers" });
  }
};

module.exports = { pendingDoctors, verifyDoctor, stats };
