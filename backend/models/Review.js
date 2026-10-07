// SQL helpers for reviews
const db = require("../config/db");

const create = async (doctorId, patientId, rating, comment) =>
  (await db.query("INSERT INTO reviews (doctor_id, patient_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *", [doctorId, patientId, rating, comment])).rows[0];

const listForDoctor = async (doctorId) =>
  (await db.query(
    "SELECT r.id, r.rating, r.comment, r.created_at, u.name AS patient FROM reviews r JOIN users u ON u.id = r.patient_id WHERE r.doctor_id = $1 ORDER BY r.created_at DESC",
    [doctorId]
  )).rows;

const hasCompletedVisit = async (patientId, doctorId) =>
  (await db.query("SELECT id FROM appointments WHERE patient_id=$1 AND doctor_id=$2 AND status='completed' LIMIT 1", [patientId, doctorId])).rows[0];

module.exports = { create, listForDoctor, hasCompletedVisit };
