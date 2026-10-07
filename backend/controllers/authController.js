// Registration, login, password checks, verification enforcement
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { uploadToCloudinary } = require("../middlewares/uploadMiddleware");

const makeToken = (user) => jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerPatient = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: "Name, email and a password of at least 6 characters are required" });
    }
    if (await User.findByEmail(email)) return res.status(400).json({ message: "This email is already registered" });
    const user = await User.createUser(name, email, await bcrypt.hash(password, 10), "patient", true);
    await User.createPatientProfile(user.id);
    res.status(201).json({ user, token: makeToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create your account" });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialty } = req.body;
    if (!name || !email || !password || !specialty || !req.file) {
      return res.status(400).json({ message: "Name, email, password, specialty and licence PDF are required" });
    }
    if (await User.findByEmail(email)) return res.status(400).json({ message: "This email is already registered" });
    const file = await uploadToCloudinary(req.file.buffer, "licenses");
    const user = await User.createUser(name, email, await bcrypt.hash(password, 10), "doctor", false);
    await User.createDoctorProfile(user.id, specialty, file.secure_url);
    res.status(201).json({ message: "Account created. An admin will review your licence before you can log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create your account" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email || "");
    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ message: "Wrong email or password" });
    }
    if (!user.is_verified) return res.status(403).json({ message: "Your account is still waiting for admin approval" });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: makeToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { registerPatient, registerDoctor, login };
