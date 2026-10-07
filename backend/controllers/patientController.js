// Patient profile and history
const User = require("../models/User");
const Appointment = require("../models/Appointment");

const getProfile = async (req, res) => {
  try {
    res.json(await User.getPatient(req.user.id));
  } catch (err) {
    res.status(500).json({ message: "Could not load profile" });
  }
};

const updateProfile = async (req, res) => {
  try {
    res.json(await User.updatePatient(req.user.id, req.body));
  } catch (err) {
    res.status(500).json({ message: "Could not update profile" });
  }
};

const getHistory = async (req, res) => {
  try {
    res.json(await Appointment.listForUser(req.user.id, "patient"));
  } catch (err) {
    res.status(500).json({ message: "Could not load history" });
  }
};

module.exports = { getProfile, updateProfile, getHistory };
