// Create and fetch doctor reviews
const Review = require("../models/Review");

const create = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;
    if (!doctorId || rating < 1 || rating > 5) return res.status(400).json({ message: "A doctor and a rating from 1 to 5 are required" });
    if (!(await Review.hasCompletedVisit(req.user.id, doctorId))) {
      return res.status(403).json({ message: "You can only review a doctor after a completed visit" });
    }
    res.status(201).json(await Review.create(doctorId, req.user.id, rating, comment));
  } catch (err) {
    res.status(500).json({ message: "Could not save review" });
  }
};

const forDoctor = async (req, res) => {
  try {
    res.json(await Review.listForDoctor(req.params.id));
  } catch (err) {
    res.status(500).json({ message: "Could not load reviews" });
  }
};

module.exports = { create, forDoctor };
