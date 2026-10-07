// Doctor search, specialty filter, update bio and details
const User = require("../models/User");

const getDoctors = async (req, res) => {
  try {
    res.json(await User.listDoctors(req.query.q || "", req.query.specialty || ""));
  } catch (err) {
    res.status(500).json({ message: "Could not load doctors" });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.getDoctor(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Could not load doctor" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { hospital, bio, fee, experience } = req.body;
    res.json(await User.updateDoctorProfile(req.user.id, { hospital, bio, fee, experience }));
  } catch (err) {
    res.status(500).json({ message: "Could not update profile" });
  }
};

module.exports = { getDoctors, getDoctorById, updateProfile };
